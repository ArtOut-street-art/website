import L from "leaflet";
import { useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { dataset } from "../data/mapData";
import { MapWrapper } from "../components/MapWrapper";

// Fix Leaflet's default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
});

// (Optional: eventually routeColors can reside within dataset)
const routeColors = [
  "#4e79ff", // primary brand blue
  "#f8d24d", // brand yellow
  "#6d95ff", // lighter blue
  "#ffd866", // lighter yellow
  "#f472b6", // supporting pink
  "#818cf8", // violet-blue
  "#f59e0b", // warm accent
];

export default function MapDemo() {
  const [selectedTour, setSelectedTour] = useState<string>(""); // tour id
  const [expandedCluster, setExpandedCluster] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const currentTour = dataset.tours.find((t) => t.id === selectedTour) || null;

  // Polyline: convert tour waypoints [lng,lat] -> [lat,lng]
  const routeCoordinates: [number, number][] = currentTour
    ? currentTour.waypoints.map(([lng, lat]) => [lat, lng])
    : [];

  // Markers:
  // If a cluster expanded (and no tour selected), show its artworks; else show clusters
  const clusters = dataset.clusters;
  const activeCluster = expandedCluster
    ? clusters.find((c) => c.id === expandedCluster) || null
    : null;

  const markers = (() => {
    if (selectedTour) {
      const wpSet = new Set(currentTour?.waypoints.map((w) => w.join(",")));
      return clusters
        .filter((c) => wpSet.has(c.center.join(",")))
        .map((c) => ({
          id: c.id,
          position: [c.center[1], c.center[0]] as [number, number],
          name: c.name,
          address: c.suburb,
          artCount: c.art_count,
          isCluster: true,
          active: true,
        }));
    }
    if (activeCluster) {
      return activeCluster.artworks.map((a) => ({
        id: a.id,
        position: [a.coordinates[1], a.coordinates[0]] as [number, number],
        name: a.title,
        address: activeCluster.name,
        // artwork pins: no artCount / isCluster
      }));
    }
    return clusters.map((c) => ({
      id: c.id,
      position: [c.center[1], c.center[0]] as [number, number],
      name: c.name,
      address: c.suburb,
      artCount: c.art_count,
      isCluster: true,
      active: expandedCluster === c.id,
    }));
  })();

  // Bounds priority: tour > expanded cluster > all clusters
  const bounds: L.LatLngBoundsExpression | undefined = (() => {
    if (routeCoordinates.length > 0) return routeCoordinates;
    if (activeCluster)
      return activeCluster.artworks.map((a) => [
        a.coordinates[1],
        a.coordinates[0],
      ]);
    return clusters.map((c) => [c.center[1], c.center[0]]);
  })();

  let routeColor = "#3357ff";
  if (selectedTour) {
    const idx = dataset.tours.findIndex((t) => t.id === selectedTour);
    routeColor = routeColors[idx % routeColors.length];
  }

  // Cluster click handler
  const handleMarkerClick = (id: string) => {
    if (selectedTour) return;
    const isCluster = dataset.clusters.some((c) => c.id === id);
    if (isCluster) {
      setExpandedCluster(id === expandedCluster ? null : id);
    }
  };

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
          Clusters = laneways & mural zones. Expand one or follow a tour path.
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
          {dataset.tours.map((tour) => (
            <button
              key={tour.id}
              onClick={() => {
                setSelectedTour(tour.id);
                setExpandedCluster(null);
                if (window.innerWidth < 768)
                  mapContainerRef.current?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
              className={`px-3 sm:px-4 py-2 rounded bg-gray-800 text-gray-200 hover:bg-gray-700 transition text-sm sm:text-base whitespace-nowrap ${
                selectedTour === tour.id ? "ring-1 ring-gray-500" : ""
              }`}
            >
              {tour.name}
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

        {/* Map Container */}
        <div
          ref={mapContainerRef}
          className="w-full rounded-xl overflow-hidden shadow-xl bg-black flex items-center justify-center"
          style={{ minHeight: "500px", maxHeight: "700px", height: "60vh" }}
        >
          <MapWrapper
            center={[-37.815, 144.967]}
            zoom={14}
            markers={markers}
            polylinePositions={routeCoordinates}
            polylineColor={routeColor}
            bounds={bounds}
            onMarkerClick={handleMarkerClick} // safe: icon only applied for clusters
          />
        </div>

        {/* Info Card */}
        {!selectedTour && !expandedCluster && (
          <div className="mt-6 p-5 bg-[#23232b] rounded-xl shadow-lg max-w-xl text-center">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
              Cluster View
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-1">
              Tap a cluster marker to reveal individual artwork pins inside that
              laneway zone.
            </p>
          </div>
        )}
        {expandedCluster && !selectedTour && (
          <div className="mt-6 p-5 bg-[#23232b] rounded-xl shadow-lg max-w-xl text-center">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
              {activeCluster?.name}
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Showing {activeCluster?.art_count} artwork points. Click markers
              for titles.
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
            <p className="text-gray-500 text-[10px] md:text-xs mt-2">
              ~{currentTour.est_distance_km} km • {currentTour.est_time_min} min
            </p>
          </div>
        )}
        <p className="text-center text-gray-400 mt-5 text-base font-sunda">
          (Prototype dataset – routes approximate. More coming soon.)
        </p>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700/40 to-transparent mt-12 w-full" />
      </div>
    </section>
  );
}
