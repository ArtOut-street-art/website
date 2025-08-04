import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

// Street art locations with local images
const streetArtLocations: {
  name: string;
  position: [number, number];
  image: string;
  desc: string;
}[] = [
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

export default function MapDemo() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import Leaflet to avoid SSR issues
    import("leaflet").then((L) => {
      // Only initialize if not already done
      if (mapRef.current && !(window as any)._artoutMap) {
        const map = L.map(mapRef.current).setView([-37.8105, 144.9631], 15);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        streetArtLocations.forEach((loc) => {
          const marker = L.marker(loc.position).addTo(map);
          marker.bindPopup(
            `<div style="min-width:180px">
              <strong>${loc.name}</strong><br/>
              <img src="${loc.image}" alt="${loc.name}" style="width:100%;border-radius:8px;margin:8px 0"/>
              <span style="font-size:0.95em">${loc.desc}</span>
            </div>`
          );
        });

        // Save to window to prevent re-initialization
        (window as any)._artoutMap = map;
      }
    });
  }, []);

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
          <div
            id="map"
            ref={mapRef}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <p className="text-center text-gray-400 mt-4 text-sm">
          (Demo map. Locations and images are for illustration only.)
        </p>
      </div>
    </section>
  );
}
