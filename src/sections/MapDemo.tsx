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
  "#3357ff",
  "#ff5722",
  "#4caf50",
  "#2196f3",
  "#9c27b0",
  "#ff9800",
  "#e91e63",
];

export default function MapDemo() {
  const [selectedTour, setSelectedTour] = useState(""); // current tour id
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const currentTour = dataset.tours.find((t) => t.id === selectedTour);

  const filteredFeatures =
    selectedTour === ""
      ? dataset.features
      : (dataset.tours
          .find((t) => t.id === selectedTour)
          ?.stop_ids.map((id) =>
            dataset.features.find((feature) => feature.id === id)
          )
          .filter(Boolean) as typeof dataset.features) || dataset.features;

  const routeCoordinates =
    selectedTour && filteredFeatures.length > 1
      ? filteredFeatures.map(
          (feature) =>
            [
              feature.geometry.coordinates[1],
              feature.geometry.coordinates[0],
            ] as [number, number]
        )
      : [];

  const bounds: L.LatLngBoundsExpression | undefined =
    filteredFeatures.length > 0
      ? (filteredFeatures.map((feature) => [
          feature.geometry.coordinates[1],
          feature.geometry.coordinates[0],
        ]) as [number, number][])
      : undefined;

  let routeColor = "#3357ff"; // default fallback
  if (selectedTour) {
    const tourIndex = dataset.tours.findIndex((t) => t.id === selectedTour);
    routeColor = routeColors[tourIndex % routeColors.length];
  }

  // Build the markers list
  const markers = filteredFeatures.map((feature) => ({
    id: feature.id.toString(),
    position: [
      feature.geometry.coordinates[1],
      feature.geometry.coordinates[0],
    ] as [number, number],
    name: feature.properties.name,
    address: feature.properties.address,
  }));

  return (
    <section
      id="map"
      className="bg-[#18181b] min-h-[700px] flex flex-col justify-center pt-0 pb-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full px-2 sm:px-6 flex flex-col items-center mt-0">
        <h2 className="text-6xl md:text-7xl font-bold text-white text-center tracking-tight mb-6">
          Explore the Map
        </h2>
        <p className="text-base md:text-lg text-gray-200 text-center mb-4 max-w-3xl mx-auto font-sunda leading-relaxed">
          Discover Melbourne’s legendary street art scene. Tap a marker to
          reveal the name and address.
        </p>
        {/* Tour Buttons */}
        <div className="mb-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              setSelectedTour("");
              if (window.innerWidth < 768)
                mapContainerRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`px-4 py-2 rounded bg-gray-800 text-gray-200 hover:bg-gray-700 transition ${
              selectedTour === "" ? "ring-1 ring-gray-500" : ""
            }`}
          >
            All Stops
          </button>
          {dataset.tours.map((tour) => (
            <button
              key={tour.id}
              onClick={() => {
                setSelectedTour(tour.id);
                if (window.innerWidth < 768)
                  mapContainerRef.current?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
              className={`px-4 py-2 rounded bg-gray-800 text-gray-200 hover:bg-gray-700 transition ${
                selectedTour === tour.id ? "ring-1 ring-gray-500" : ""
              }`}
            >
              {tour.name}
            </button>
          ))}
        </div>

        {/* Map Container */}
        <div
          ref={mapContainerRef}
          className="w-full rounded-xl overflow-hidden shadow-xl bg-black flex items-center justify-center"
          style={{ minHeight: "500px", maxHeight: "700px", height: "60vh" }}
        >
          <MapWrapper
            center={[-37.815, 144.967]}
            zoom={15}
            markers={markers}
            polylinePositions={routeCoordinates}
            polylineColor={routeColor}
            bounds={bounds}
          />
        </div>

        {/* Guided Tour Card moved below the map */}
        {selectedTour === "" ? (
          <div className="mt-6 p-5 bg-[#23232b] rounded-xl shadow-lg max-w-xl text-center">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
              Guided Street Art Tour
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-1">
              Explore anchor lanes and mural corridors. Pick a preset to draw a
              clean path—great for first‑time wanderers or quick inspiration.
            </p>
          </div>
        ) : (
          <div className="mt-6 p-5 bg-[#23232b] rounded-xl shadow-lg max-w-xl text-center">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
              {currentTour?.name}
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              {currentTour?.description}
            </p>
            <p className="text-gray-500 text-[10px] md:text-xs mt-2">
              ~{currentTour?.approx_distance_km} km •{" "}
              {currentTour?.est_time_min} min
            </p>
          </div>
        )}
        <p className="text-center text-gray-400 mt-5 text-base font-sunda">
          (Demo map. Want your art featured?{" "}
          <a
            href="#contact"
            className="text-pink-400 underline hover:text-yellow-400 transition-colors font-medium"
          >
            Contact us
          </a>
          !)
        </p>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700/40 to-transparent mt-12 w-full" />
      </div>
    </section>
  );
}
