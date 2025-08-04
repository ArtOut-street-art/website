// @ts-expect-error: No type declarations for leaflet in this project
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Example street art locations in Melbourne CBD with local images
const streetArtLocations = [
  {
    name: "Hosier Lane",
    position: [-37.816563, 144.969021],
    image: "/images/hosier-lane.jpg",
    desc: "Melbourne's most famous street art laneway.",
  },
  {
    name: "ACDC Lane",
    position: [-37.817682, 144.969993],
    image: "/images/acdc-lane.jpg",
    desc: "Iconic laneway with murals and music history.",
  },
  {
    name: "Union Lane",
    position: [-37.814857, 144.965356],
    image: "/images/union-lane.jpg",
    desc: "A vibrant, ever-changing graffiti corridor.",
  },
  {
    name: "Duckboard Place",
    position: [-37.817187, 144.969099],
    image: "/images/duckboard-place.jpg",
    desc: "Hidden laneway with large-scale murals.",
  },
];

// Use a proper marker icon (e.g., a colored pin or spray can)
const pinIcon = new L.Icon({
  iconUrl:
    "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
  shadowAnchor: [13, 41],
  className: "art-marker-icon",
});

export default function MapDemo() {
  // Melbourne CBD bounds (roughly)
  const bounds: [[number, number], [number, number]] = [
    [-37.825, 144.955], // Southwest
    [-37.805, 144.98], // Northeast
  ];

  return (
    <section id="map" className="py-20 bg-[#23232b]">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className="text-4xl md:text-5xl font-artout font-bold text-yellow-400 mb-8 text-center"
          style={{ textShadow: "2px 2px 8px #000" }}
        >
          Explore the Map
        </h2>
        <p className="text-lg text-white text-center mb-8 max-w-2xl mx-auto">
          See street art locations around Melbourne Central in real time. Click
          on pins to view art, artists, and details. You can add your own art by
          snapping a photo and letting ArtOut geotag it automatically!
        </p>
        <div className="w-full h-[400px] md:h-[600px] rounded-xl overflow-hidden shadow-lg border-4 border-yellow-400 bg-black flex items-center justify-center">
          <MapContainer
            center={[-37.8105, 144.9631]}
            zoom={15}
            scrollWheelZoom={true}
            style={{ width: "100%", height: "100%" }}
            attributionControl={false}
            maxBounds={bounds}
            maxBoundsViscosity={1.0}
          >
            <TileLayer
              attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWF1cnlhMzYwIiwiYSI6ImNrZDhjbmswdzBwM20ycXRnNW8zczYzd3MifQ.i--yysqANhdYd0xtQQATUA"
              tileSize={512 as any}
              zoomOffset={-1}
            />
            {streetArtLocations.map((loc) => (
              <Marker
                key={loc.name}
                position={loc.position as [number, number]}
                icon={pinIcon as L.Icon}
              >
                <Popup>
                  <div style={{ minWidth: 180 }}>
                    <strong>{loc.name}</strong>
                    <br />
                    <img
                      src={loc.image}
                      alt={loc.name}
                      style={{
                        width: "100%",
                        borderRadius: 8,
                        margin: "8px 0",
                      }}
                    />
                    <span className="text-sm">{loc.desc}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <style>{`
          .leaflet-control-attribution {
            display: none !important;
          }
        `}</style>
        <p className="text-center text-gray-400 mt-4 text-sm">
          (Demo map. Locations and images are for illustration only.)
        </p>
      </div>
    </section>
  );
}
