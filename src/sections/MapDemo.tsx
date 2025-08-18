import L from "leaflet";
import { useState, useRef, useMemo, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapWrapper } from "../components/MapWrapper";

// Utility to try multiple fetch paths (public then src)
async function fetchFirst(paths: string[]) {
  let lastErr: any;
  for (const p of paths) {
    try {
      const r = await fetch(p);
      if (r.ok) {
        const text = await r.text();
        if (text.startsWith("<!doctype") || text.startsWith("<html")) {
          throw new Error(`Got HTML instead of JSON for ${p}`);
        }
        return JSON.parse(text);
      }
      lastErr = `${p} -> ${r.status}`;
    } catch (e) {
      lastErr = e;
    }
  }
  throw new Error(`Failed all paths: ${lastErr}`);
}

// Leaflet default icon fix
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
});

// Helper: haversine distance (km)
function haversine(a: [number, number], b: [number, number]) {
  const R = 6371;
  const dLat = ((b[1] - a[1]) * Math.PI) / 180;
  const dLng = ((b[0] - a[0]) * Math.PI) / 180;
  const lat1 = (a[1] * Math.PI) / 180;
  const lat2 = (b[1] * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Approx length of LineString (km)
function lineLengthKm(coords: [number, number][]) {
  let total = 0;
  for (let i = 1; i < coords.length; i++)
    total += haversine(coords[i - 1], coords[i]);
  return total;
}

type ClusterFeature = {
  id: string;
  properties: {
    name: string;
    address: string;
    suburb: string;
    art_count: number;
    scatter_radius_m: number;
    description?: string;
  };
  geometry: { type: "Point"; coordinates: [number, number] };
};

type ArtworkFeature = {
  id: string;
  properties: {
    cluster_id: string;
    name: string;
    description: string;
    image?: string;
  };
  geometry: { type: "Point"; coordinates: [number, number] };
};

type TourFeature = {
  id: string;
  properties: {
    name: string;
    mode: "walking";
    description: string;
    waypoint_cluster_ids: string[];
  };
  geometry: { type: "LineString"; coordinates: [number, number][] };
};

// Helper: normalize possible wrapped default export + validate FC
function normalizeFC(raw: any, label: string) {
  const fc = raw?.default && !raw.type ? raw.default : raw;
  if (!fc || fc.type !== "FeatureCollection" || !Array.isArray(fc.features)) {
    throw new Error(`Invalid GeoJSON for ${label}`);
  }
  return fc;
}

export default function MapDemo() {
  // State
  const [selectedTour, setSelectedTour] = useState<string>(""); // tour id
  const [expandedCluster, setExpandedCluster] = useState<string | null>(null);
  // NEW: loaded raw feature collections
  const [clustersFC, setClustersFC] = useState<any | null>(null);
  const [artworksFC, setArtworksFC] = useState<any | null>(null);
  const [toursFC, setToursFC] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  // NEW: directions (walking route) state
  const [directionsCoords, setDirectionsCoords] = useState<
    [number, number][] | null
  >(null);
  const [directionsLoading, setDirectionsLoading] = useState(false);
  const [directionsError, setDirectionsError] = useState<string | null>(null);
  // NEW: lock state (false = locked / non-interactive)
  const [mapUnlocked, setMapUnlocked] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Data load (direct import attempt first for dev, fallback to fetch from /data then /src/data)
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        let clustersJson, artworksJson, toursJson;
        try {
          const [cMod, aMod, tMod] = await Promise.all([
            import("../data/clusters.geojson"),
            import("../data/artworks.geojson"),
            import("../data/tours.geojson"),
          ]);
          clustersJson = normalizeFC(cMod, "clusters");
          artworksJson = normalizeFC(aMod, "artworks");
          toursJson = normalizeFC(tMod, "tours");
        } catch {
          clustersJson = normalizeFC(
            await fetchFirst([
              "/data/clusters.geojson",
              "/src/data/clusters.geojson",
            ]),
            "clusters"
          );
          artworksJson = normalizeFC(
            await fetchFirst([
              "/data/artworks.geojson",
              "/src/data/artworks.geojson",
            ]),
            "artworks"
          );
          const maybeDirections = await (async () => {
            try {
              return normalizeFC(
                await fetchFirst([
                  "/data/tours_directions.geojson",
                  "/src/data/tours_directions.geojson",
                ]),
                "tours_directions"
              );
            } catch {
              return null;
            }
          })();
          toursJson =
            maybeDirections ||
            normalizeFC(
              await fetchFirst([
                "/data/tours.geojson",
                "/src/data/tours.geojson",
              ]),
              "tours"
            );
        }
        if (!cancelled) {
          setClustersFC(clustersJson);
          setArtworksFC(artworksJson);
          setToursFC(toursJson);
          setLoading(false);
        }
      } catch (e: any) {
        if (!cancelled) {
          setLoadError(
            `Map data failed to load: ${e.message || "Unknown error"}.`
          );
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Derived collections
  const clusters = useMemo(
    () =>
      clustersFC
        ? (clustersFC.features as ClusterFeature[]).map((f) => ({
            id: f.id,
            name: f.properties.name,
            address: f.properties.address,
            suburb: f.properties.suburb,
            artCount: f.properties.art_count,
            center: f.geometry.coordinates as [number, number],
          }))
        : [],
    [clustersFC]
  );

  const artworksByCluster = useMemo(() => {
    if (!artworksFC) return {} as Record<string, ArtworkFeature[]>;
    const m: Record<string, ArtworkFeature[]> = {};
    (artworksFC.features as ArtworkFeature[]).forEach((f) => {
      (m[f.properties.cluster_id] ||= []).push(f);
    });
    return m;
  }, [artworksFC]);

  const tours = useMemo(
    () =>
      toursFC
        ? (toursFC.features as TourFeature[]).map((f) => ({
            id: f.id,
            name: f.properties.name,
            description: f.properties.description,
            clusterIds: f.properties.waypoint_cluster_ids,
            coords: f.geometry.coordinates,
          }))
        : [],
    [toursFC]
  );

  const currentTour = useMemo(
    () => tours.find((t) => t.id === selectedTour) || null,
    [tours, selectedTour]
  );

  // NEW: fetch walking directions when a tour is selected (if token present)
  useEffect(() => {
    setDirectionsCoords(null);
    setDirectionsError(null);
    if (!currentTour) return;
    const token = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined;
    if (!token) return; // silently skip if no token
    let cancelled = false;
    async function run() {
      try {
        setDirectionsLoading(true);
        if (!currentTour) return; // Additional null check
        const pts = currentTour.clusterIds
          .map((id) => {
            const c = clusters.find((c) => c.id === id);
            return c ? `${c.center[0]},${c.center[1]}` : null;
          })
          .filter(Boolean);
        if (!pts.length) throw new Error("No waypoint coordinates");
        const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${pts.join(
          ";"
        )}?geometries=geojson&overview=full&access_token=${token}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Directions HTTP ${res.status}`);
        const json = await res.json();
        const line = json?.routes?.[0]?.geometry?.coordinates;
        if (Array.isArray(line) && !cancelled) {
          setDirectionsCoords(
            line.map(
              ([lng, lat]: [number, number]) => [lat, lng] as [number, number]
            )
          );
        }
      } catch (e: any) {
        if (!cancelled) setDirectionsError(e.message || "Directions failed");
      } finally {
        if (!cancelled) setDirectionsLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [currentTour, clusters]);

  // Polyline positions (Leaflet expects [lat,lng]); prefer directions
  const fallbackRoute: [number, number][] = useMemo(
    () =>
      currentTour ? currentTour.coords.map(([lng, lat]) => [lat, lng]) : [],
    [currentTour]
  );
  const routeCoordinates: [number, number][] =
    directionsCoords || fallbackRoute;

  const markers = useMemo(() => {
    if (selectedTour && currentTour) {
      const ids = new Set(currentTour.clusterIds);
      return clusters
        .filter((c) => ids.has(c.id))
        .map((c) => ({
          id: c.id,
          position: [c.center[1], c.center[0]] as [number, number],
          name: c.name,
          address: c.suburb,
          artCount: c.artCount,
          isCluster: true,
          active: true,
        }));
    }
    if (expandedCluster) {
      return (artworksByCluster[expandedCluster] || []).map((a) => ({
        id: a.id,
        position: [a.geometry.coordinates[1], a.geometry.coordinates[0]] as [
          number,
          number
        ],
        name: a.properties.name,
        address: clusters.find((c) => c.id === expandedCluster)?.name || "",
      }));
    }
    return clusters.map((c) => ({
      id: c.id,
      position: [c.center[1], c.center[0]] as [number, number],
      name: c.name,
      address: c.suburb,
      artCount: c.artCount,
      isCluster: true,
      active: expandedCluster === c.id,
    }));
  }, [selectedTour, currentTour, expandedCluster, clusters, artworksByCluster]);

  const bounds: L.LatLngBoundsExpression | undefined = useMemo(() => {
    if (routeCoordinates.length > 1) return routeCoordinates;
    if (expandedCluster) {
      const feats = artworksByCluster[expandedCluster] || [];
      if (feats.length)
        return feats.map((f) => [
          f.geometry.coordinates[1],
          f.geometry.coordinates[0],
        ]);
    }
    return clusters.map((c) => [c.center[1], c.center[0]]);
  }, [routeCoordinates, expandedCluster, artworksByCluster, clusters]);

  // Route color (solid brand colors)
  const routeColor = useMemo(
    () =>
      selectedTour
        ? ["#4e79ff", "#f8d24d", "#f472b6", "#818cf8"][ // solid palette
            tours.findIndex((t) => t.id === selectedTour) % 4
          ]
        : "#4e79ff",
    [selectedTour, tours]
  );

  // Distance/time: compute over raw lon/lat source of whichever polyline we use
  const rawRouteLngLat: [number, number][] = useMemo(() => {
    if (directionsCoords)
      return directionsCoords.map(([lat, lng]) => [lng, lat]);
    return currentTour ? currentTour.coords : [];
  }, [directionsCoords, currentTour]);

  const estDistanceKm = useMemo(
    () => (rawRouteLngLat.length > 1 ? lineLengthKm(rawRouteLngLat) : null),
    [rawRouteLngLat]
  );
  const estTimeMin = useMemo(
    () => (estDistanceKm ? Math.round((estDistanceKm / 3.8) * 60) : null),
    [estDistanceKm]
  );

  function handleMarkerClick(id: string) {
    if (selectedTour) return;
    if (clusters.some((c) => c.id === id)) {
      setExpandedCluster((prev) => (prev === id ? null : id));
    }
  }

  // Conditional UI (after all hooks)
  if (loading) {
    return (
      <section id="map" className="py-20 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-300">
          <h2 className="text-3xl font-bold mb-4">Explore the Map</h2>
          <p className="text-sm text-gray-400">Loading map data…</p>
        </div>
      </section>
    );
  }
  if (loadError || !clustersFC || !artworksFC || !toursFC) {
    return (
      <section id="map" className="py-20 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 text-center text-red-400">
          <h2 className="text-3xl font-bold mb-4">Explore the Map</h2>
          <p className="text-sm">{loadError || "Data unavailable."}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="map"
      className="bg-[#18181b] min-h-[700px] flex flex-col justify-center pt-0 pb-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full px-2 sm:px-6 flex flex-col items-center mt-0">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center tracking-tight mb-4 max-w-full">
          Explore the Map
        </h2>
        <div className="h-[3px] w-40 bg-gradient-to-r from-artout-blue via-artout-yellow to-artout-blue rounded-full mb-4" />
        <p className="text-base md:text-lg text-gray-300 text-center mb-4 max-w-3xl mx-auto font-sunda leading-relaxed">
          Tap a cluster to reveal its artworks or select a walking tour.
        </p>

        {/* Tour Buttons */}
        <div className="mb-4 flex flex-wrap justify-center gap-2 sm:gap-3 max-w-full px-2">
          <button
            onClick={() => {
              setSelectedTour("");
              setExpandedCluster(null);
              if (window.innerWidth < 768)
                mapContainerRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`px-3 sm:px-4 py-2 rounded bg-gray-800 text-gray-200 hover:bg-gray-700 transition text-sm sm:text-base whitespace-nowrap ${
              selectedTour === "" ? "ring-1 ring-gray-500" : ""
            }`}
          >
            All Clusters
          </button>
          {tours.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTour(t.id);
                setExpandedCluster(null);
                if (window.innerWidth < 768)
                  mapContainerRef.current?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
              className={`px-3 sm:px-4 py-2 rounded bg-gray-800 text-gray-200 hover:bg-gray-700 transition text-sm sm:text-base whitespace-nowrap ${
                selectedTour === t.id ? "ring-1 ring-gray-500" : ""
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {expandedCluster && !selectedTour && (
          <div className="mb-4">
            <button
              onClick={() => setExpandedCluster(null)}
              className="text-xs px-3 py-1 rounded bg-pink-600 hover:bg-pink-500 text-white transition"
            >
              ← Back to Clusters
            </button>
          </div>
        )}

        {/* Map */}
        <div
          ref={mapContainerRef}
          className="relative w-full rounded-xl overflow-hidden shadow-xl bg-black flex items-center justify-center"
          style={{ minHeight: "500px", maxHeight: "700px", height: "60vh" }}
        >
          {/* Lock / Unlock control */}
          <button
            onClick={() => setMapUnlocked((u) => !u)}
            className="absolute z-[500] top-2 right-2 px-3 py-1.5 rounded-md text-xs font-medium tracking-wide transition
              bg-gray-800/80 hover:bg-gray-700 text-gray-200 backdrop-blur
              border border-gray-600 shadow"
            aria-pressed={mapUnlocked}
            title={
              mapUnlocked
                ? "Lock map (disable manual pan/zoom)"
                : "Unlock map (enable manual pan/zoom)"
            }
          >
            {mapUnlocked ? "Lock Map" : "Unlock Map"}
          </button>
          {!mapUnlocked && (
            <div
              className="pointer-events-none absolute inset-x-0 top-0 flex justify-center mt-2"
              aria-hidden="true"
            >
              <span className="text-[10px] md:text-xs px-2 py-1 rounded bg-gray-900/70 text-gray-300 border border-gray-700 shadow">
                Map locked • click Unlock to pan / zoom
              </span>
            </div>
          )}
          <MapWrapper
            center={[-37.815, 144.967]}
            zoom={14}
            markers={markers}
            polylinePositions={routeCoordinates}
            polylineColor={routeColor}
            bounds={bounds}
            onMarkerClick={handleMarkerClick}
            interactive={mapUnlocked} // NEW
          />
        </div>

        {/* Info Cards */}
        {!selectedTour && !expandedCluster && (
          <div className="mt-6 p-5 bg-[#23232b] rounded-xl shadow-lg max-w-xl text-center">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
              Cluster View
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-1">
              Click a cluster marker to see its individual artwork points.
            </p>
          </div>
        )}
        {expandedCluster && !selectedTour && (
          <div className="mt-6 p-5 bg-[#23232b] rounded-xl shadow-lg max-w-xl text-center">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
              {clusters.find((c) => c.id === expandedCluster)?.name}
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Showing {(artworksByCluster[expandedCluster] || []).length}{" "}
              artwork pins.
            </p>
          </div>
        )}
        {selectedTour && currentTour && (
          <div className="mt-6 p-5 bg-[#23232b] rounded-xl shadow-lg max-w-xl text-center">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
              {currentTour.name}
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              {currentTour.description}
            </p>
            {directionsLoading && (
              <p className="text-[10px] md:text-xs text-artout-yellow mt-2">
                Fetching walking route…
              </p>
            )}
            {directionsError && (
              <p className="text-[10px] md:text-xs text-pink-400 mt-2">
                {directionsError} (showing straight lines)
              </p>
            )}
            {estDistanceKm && (
              <p className="text-gray-500 text-[10px] md:text-xs mt-2">
                ~{estDistanceKm.toFixed(2)} km • {estTimeMin} min (approx)
              </p>
            )}
          </div>
        )}
        <p className="text-center text-gray-400 mt-5 text-base font-sunda">
          (Prototype – tour paths auto‑generated; directions variant preferred.)
        </p>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700/40 to-transparent mt-12 w-full" />
      </div>
    </section>
  );
}
