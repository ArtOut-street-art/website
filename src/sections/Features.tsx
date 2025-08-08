export default function Features() {
  return (
    <section
      id="features"
      className="py-20 w-full max-w-full overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 text-center">
        <h2
          className="text-5xl font-artout font-extrabold mb-12 text-gray-300 drop-shadow tracking-tight"
          style={{ letterSpacing: "0.04em" }}
        >
          Features
        </h2>
        {/* Feature/benefit blocks */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-[#23232b] rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <span className="text-3xl mb-2">📍</span>
            <h3 className="text-xl font-bold text-gray-300 mb-2">
              Instant Geotagging
            </h3>
            <p className="text-gray-400 text-base">
              Capture street art in the moment — no uploads, no hassle. ArtOut
              instantly tags your photo with the exact location: city, street,
              and country. Every snap becomes part of a living archive.
            </p>
            <img
              src="/images/gallery1.jpg"
              alt="Geotag example"
              className="rounded-lg mt-4 w-full h-32 object-cover"
            />
          </div>
          <div className="bg-[#23232b] rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <span className="text-3xl mb-2">🌍</span>
            <h3 className="text-xl font-bold text-gray-300 mb-2">
              A Worldwide Street Gallery
            </h3>
            <p className="text-gray-400 text-base">
              Wander through hidden alleyways in Tokyo, rooftops in New York,
              and laneways in Melbourne — all without leaving your screen. Every
              tag adds a new piece to the map. Every user becomes a curator of
              creativity.
            </p>
            <img
              src="/images/gallery2.jpg"
              alt="Street art"
              className="rounded-lg mt-4 w-full h-32 object-cover"
            />
          </div>
          <div className="bg-[#23232b] rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <span className="text-3xl mb-2">🖌️</span>
            <h3 className="text-xl font-bold text-gray-300 mb-2">
              Preserve What Fades
            </h3>
            <p className="text-gray-400 text-base">
              Street art is fleeting — walls get painted over, buildings get
              demolished. ArtOut captures these moments in time so they’re never
              lost. We’re not just mapping art, we’re archiving culture.
            </p>
            <img
              src="/images/gallery3.jpg"
              alt="Urban graffiti"
              className="rounded-lg mt-4 w-full h-32 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
