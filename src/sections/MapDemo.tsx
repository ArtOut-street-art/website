import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { dataset } from "../data/mapData";

// Fix Leaflet's default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
});

function FitBoundsUpdater({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, map]);
  return null;
}

function InvalidateMapSize() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}

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

  const currentTour = dataset.tours.find((t) => t.id === selectedTour);

  const filteredFeatures =
    selectedTour === ""
      ? dataset.features
      : (() => {
          const tour = dataset.tours.find((t) => t.id === selectedTour);
          if (!tour) return dataset.features;
          return tour.stop_ids
            .map((id) => dataset.features.find((feature) => feature.id === id))
            .filter(Boolean) as typeof dataset.features;
        })();

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

  // Use tour's embedded color if selected; otherwise fallback
  let routeColor = "#3357ff"; // default fallback
  if (selectedTour) {
    const tourIndex = dataset.tours.findIndex((t) => t.id === selectedTour);
    routeColor = routeColors[tourIndex % routeColors.length];
  }

  return (
    <section
      id="map"
      className="bg-[#18181b] min-h-[700px] flex flex-col justify-center pt-0 pb-16"
    >
      <div className="max-w-7xl mx-auto w-full px-2 sm:px-6 flex flex-col items-center mt-0">
        <h2 className="text-6xl md:text-7xl font-bold text-white text-center tracking-tight mb-6">
          Explore the Map
        </h2>
        <p className="text-lg md:text-xl text-gray-200 text-center mb-4 max-w-3xl mx-auto font-sunda">
          Discover Melbourne’s legendary street art scene. Tap a marker to
          reveal the name and address.
        </p>
        {/* Tour Buttons */}
        <div className="mb-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setSelectedTour("")}
            className={`px-4 py-2 rounded bg-gray-800 text-gray-200 hover:bg-gray-700 transition-colors ${
              selectedTour === "" ? "border-2 border-yellow-400" : ""
            }`}
          >
            View All Stops
          </button>
          {dataset.tours.map((tour) => (
            <button
              key={tour.id}
              onClick={() => setSelectedTour(tour.id)}
              className={`px-4 py-2 rounded bg-gray-800 text-gray-200 hover:bg-gray-700 transition-colors ${
                selectedTour === tour.id ? "border-2 border-yellow-400" : ""
              }`}
            >
              {tour.name}
            </button>
          ))}
        </div>
        {/* Guided Tour Card */}
        {selectedTour === "" ? (
          <div className="mb-6 p-6 bg-gray-800 rounded-2xl shadow-xl max-w-xl text-center">
            <h3 className="text-2xl font-artout font-bold text-white mb-2">
              🗺️ Guided Street Art Tour
            </h3>
            <p className="text-gray-200 mb-2">
              Follow our curated route through Melbourne’s most iconic laneways.
              Each stop is packed with color, history, and stories.
            </p>
            <button className="mt-2 px-4 py-2 bg-yellow-400 text-black font-bold rounded-full shadow hover:bg-yellow-300 transition-colors">
              Start Tour
            </button>
            <p className="mt-2 text-gray-400">
              Click above tours to see more details.
            </p>
          </div>
        ) : (
          <div className="mb-6 p-6 bg-gray-800 rounded-2xl shadow-xl max-w-xl text-center">
            <h3 className="text-2xl font-artout font-bold text-white mb-2">
              Guided Tour Details
            </h3>
            <p className="text-gray-200">{currentTour?.description}</p>
            <p className="mt-2 text-gray-400">
              Approx. {currentTour?.approx_distance_km} km •{" "}
              {currentTour?.est_time_min} min
            </p>
          </div>
        )}
        {/* Map Container */}
        <div
          className="w-full rounded-xl overflow-hidden shadow-2xl border-4 border-yellow-400 bg-black flex items-center justify-center"
          style={{ minHeight: "500px", maxHeight: "700px", height: "60vh" }}
        >
          <MapContainer
            center={[-37.815, 144.967]}
            zoom={15}
            style={{ width: "100%", height: "100%" }}
            scrollWheelZoom={true}
            className="w-full h-[60vh] min-h-[500px] max-h-[700px] rounded-xl"
          >
            {/* Using a lower‑detail tile layer */}
            <TileLayer
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © CARTO'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            {filteredFeatures.map((feature) => (
              <Marker
                key={feature.id}
                position={[
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0],
                ]}
              >
                <Popup>
                  <div style={{ minWidth: 180, maxWidth: 220 }}>
                    <strong style={{ fontSize: "16px", fontWeight: "500" }}>
                      {feature.properties.name}
                    </strong>
                    <br />
                    <span style={{ fontSize: "13px", lineHeight: "1.4" }}>
                      {feature.properties.address}
                    </span>
                  </div>
                </Popup>
              </Marker>
            ))}
            {selectedTour && routeCoordinates.length > 1 && (
              <Polyline
                positions={routeCoordinates}
                color={routeColor}
                weight={5}
                opacity={0.9}
              />
            )}
            {bounds && <FitBoundsUpdater bounds={bounds} />}
            <InvalidateMapSize />
          </MapContainer>
        </div>
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
      </div>
    </section>
  );
}
