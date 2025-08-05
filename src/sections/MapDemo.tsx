import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Street art locations with local images (longitude, latitude)
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
    desc: "Take in the beloved stretch of asphalt that links Chinatown with Lonsdale Street, boasting a mix of old-school eateries, street art and dive bars.",
  },
  {
    name: "Centre Place",
    position: [-37.817543, 144.965331],
    image: "/images/centre-place.jpg",
    desc: "Melbourne's quintessential laneway—Centre Place surprises and delights with wild street art, boutiques, and buzzing cafes.",
  },
  {
    name: "Blender Lane",
    position: [-37.810668, 144.953315],
    image: "/images/blender-lane.jpg",
    desc: "Discover a spectacle of colourful street art with stencils, murals, tags and paste-ups covering every surface.",
  },
  {
    name: "Duckboard Place",
    position: [-37.817187, 144.969099],
    image: "/images/duckboard-place.jpg",
    desc: "Once a haunt for WWII troops, now a chic playground for foodies, wine lovers, and artists with ever-changing street art.",
  },
  {
    name: "Hosier Lane",
    position: [-37.816563, 144.969021],
    image: "/images/hosier-lane.jpg",
    desc: "Wander down this iconic bluestone laneway and take in a dizzying array of colours and characters by local and international street artists.",
  },
  {
    name: "Union Lane",
    position: [-37.814857, 144.965356],
    image: "/images/union-lane.jpg",
    desc: "Step away from the bustling Bourke Street Mall and into Union Lane, a much-loved street-art 'gallery' that cuts through to Little Collins Street.",
  },
];

export default function MapDemo() {
  return (
    <section
      id="map"
      className="bg-transparent min-h-[350px] flex flex-col justify-center pt-0 pb-10"
    >
      <div className="max-w-7xl mx-auto w-full px-2 sm:px-6 flex flex-col items-center mt-0">
        <h2
          className="text-5xl md:text-6xl font-bold mb-4 text-yellow-400 text-center font-sunda tracking-tight"
          style={{ textShadow: "2px 2px 8px #000" }}
        >
          Explore the Map
        </h2>
        <p className="text-lg md:text-xl text-white text-center mb-4 max-w-2xl mx-auto">
          See street art locations around Melbourne Central in real time. Click
          on pins to view art, artists, and details. You can add your own art by
          snapping a photo and letting ArtOut geotag it automatically!
        </p>
        <div
          className="w-full rounded-xl overflow-hidden shadow-lg border-4 border-yellow-400 bg-black flex items-center justify-center"
          style={{
            minHeight: "220px",
            maxHeight: "500px",
            height: "40vh",
          }}
        >
          <MapContainer
            center={[-37.8105, 144.9631]}
            zoom={15}
            style={{ width: "100%", height: "100%" }}
            scrollWheelZoom={true}
            className="w-full h-[40vh] min-h-[220px] max-h-[500px] rounded-xl"
          >
            <TileLayer
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {streetArtLocations.map((loc) => (
              <Marker key={loc.name} position={loc.position}>
                <Popup>
                  <div style={{ minWidth: 180 }}>
                    <strong>{loc.name}</strong>
                    <br />
                    <img
                      src={loc.image}
                      alt={loc.name}
                      className="w-full rounded-lg my-2"
                    />
                    <span className="text-sm">{loc.desc}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <p className="text-center text-gray-400 mt-3 text-sm">
          (Demo map. Locations and images are for illustration only.)
        </p>
      </div>
    </section>
  );
}
