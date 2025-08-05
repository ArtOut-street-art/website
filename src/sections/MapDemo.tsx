import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
});

// Improved street art locations with local images and engaging descriptions
const streetArtLocations: {
  name: string;
  position: [number, number];
  image: string;
  desc: string;
}[] = [
  {
    name: "Tattersalls Lane",
    position: [-37.807972, 144.965355],
    image: "/images/tattersalls-lane.jpg",
    desc: "A vibrant laneway bursting with color, home to ever-changing murals, hidden bars, and authentic Asian eateries.",
  },
  {
    name: "Centre Place",
    position: [-37.817543, 144.965331],
    image: "/images/centre-place.jpg",
    desc: "Melbourne’s iconic blue-stone alley, alive with graffiti, indie boutiques, and the aroma of fresh espresso.",
  },
  {
    name: "Blender Lane",
    position: [-37.810668, 144.953315],
    image: "/images/blender-lane.jpg",
    desc: "A hidden gem where artists experiment with stencils, murals, and paste-ups. Blender Lane is a living gallery.",
  },
  {
    name: "Duckboard Place",
    position: [-37.817187, 144.969099],
    image: "/images/duckboard-place.jpg",
    desc: "From WWII history to modern murals, Duckboard Place is a canvas for large-scale works and edgy creativity.",
  },
  {
    name: "Hosier Lane",
    position: [-37.816563, 144.969021],
    image: "/images/hosier-lane.jpg",
    desc: "Melbourne’s most photographed street art destination. Every inch is covered in color and characters.",
  },
  {
    name: "Union Lane",
    position: [-37.814857, 144.965356],
    image: "/images/union-lane.jpg",
    desc: "A narrow corridor transformed into a graffiti wonderland. Union Lane is a favorite for street artists.",
  },
];

export default function MapDemo() {
  return (
    <section
      id="map"
      className="bg-[#18181b] min-h-[700px] flex flex-col justify-center pt-0 pb-16"
    >
      <div className="max-w-7xl mx-auto w-full px-2 sm:px-6 flex flex-col items-center mt-0">
        <h2 className="text-6xl md:text-7xl font-bold text-white text-center tracking-tight mb-6">
          Explore the Map
        </h2>
        <p className="text-lg md:text-xl text-gray-200 text-center mb-8 max-w-3xl mx-auto font-sunda">
          Discover Melbourne’s legendary street art scene. Tap a pin to reveal
          the story behind each mural, or use our guided tour and artist
          explorer to make the most of your visit.
        </p>
        <div className="w-full flex flex-col md:flex-row gap-8 mb-10">
          <div className="bg-gradient-to-br from-yellow-300/20 via-yellow-100/10 to-transparent rounded-2xl shadow-xl p-8 flex-1 text-left border-l-4 border-yellow-400">
            <h3 className="text-2xl font-artout font-bold text-yellow-400 mb-2 flex items-center gap-2">
              <span className="text-3xl">🗺️</span> Guided Street Art Tour
            </h3>
            <p className="text-gray-200 text-lg">
              Follow our curated route through Melbourne’s most iconic laneways.
              Each stop is packed with color, history, and stories from the
              artists themselves.
            </p>
            <a
              href="#"
              className="inline-block mt-4 px-6 py-2 rounded-full bg-yellow-400 text-black font-bold shadow hover:bg-yellow-300 transition"
            >
              Start Tour
            </a>
          </div>
          <div className="bg-gradient-to-br from-pink-400/20 via-pink-100/10 to-transparent rounded-2xl shadow-xl p-8 flex-1 text-left border-l-4 border-pink-400">
            <h3 className="text-2xl font-artout font-bold text-pink-400 mb-2 flex items-center gap-2">
              <span className="text-3xl">🎨</span> Artist Explorer
            </h3>
            <p className="text-gray-200 text-lg">
              Looking for a favorite artist? Filter the map to see all their
              works, read bios, and get directions to each mural.
            </p>
            <a
              href="#"
              className="inline-block mt-4 px-6 py-2 rounded-full bg-pink-400 text-white font-bold shadow hover:bg-pink-300 transition"
            >
              Browse Artists
            </a>
          </div>
        </div>
        <div
          className="w-full rounded-xl overflow-hidden shadow-2xl border-4 border-yellow-400 bg-black flex items-center justify-center"
          style={{
            minHeight: "500px",
            maxHeight: "700px",
            height: "60vh",
          }}
        >
          <MapContainer
            center={[-37.8105, 144.9631]}
            zoom={15}
            style={{ width: "100%", height: "100%" }}
            scrollWheelZoom={true}
            className="w-full h-[60vh] min-h-[500px] max-h-[700px] rounded-xl"
          >
            <TileLayer
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {streetArtLocations.map((loc) => (
              <Marker key={loc.name} position={loc.position}>
                <Popup maxWidth={250} minWidth={200}>
                  <div style={{ minWidth: 200, maxWidth: 240 }}>
                    <strong
                      style={{
                        fontSize: "18px",
                        fontWeight: "500",
                      }}
                    >
                      {loc.name}
                    </strong>
                    <br />
                    <img
                      src={loc.image}
                      alt={loc.name}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        margin: "10px 0",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "15px",
                        lineHeight: "1.5",
                        color: "#000",
                      }}
                    >
                      {loc.desc}
                    </span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <p className="text-center text-gray-400 mt-5 text-base font-sunda">
          (Demo map. Locations and images are for illustration only. Want your
          art featured?{" "}
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
