export default function About() {
  return (
    <section
      id="about"
      className="py-20 relative overflow-hidden w-full max-w-full overflow-x-hidden"
    >
      <div className="max-w-6xl mx-auto px-2 sm:px-6 text-center relative z-30">
        <h2
          className="text-5xl font-extrabold mb-8 text-pink-400 font-artout drop-shadow"
          style={{ textShadow: "2px 2px 8px #000" }}
        >
          About <span className="text-yellow-400 font-artout">ArtOut</span>
        </h2>
        <p className="text-xl text-white mb-12">
          ArtOut is a global platform and mobile app for discovering, capturing,
          and mapping street art in real time. Snap a photo and instantly pin it
          to a global map—no uploads, no filters, just live, authentic urban
          creativity. See the world through its street art.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Mission Card */}
          <div className="bg-[#23232b] rounded-2xl shadow-lg p-8 flex flex-col items-center border-2 border-pink-600 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.03]">
            <span className="text-4xl mb-3">🎯</span>
            <h3 className="text-2xl font-bold text-pink-400 mb-3">
              Our Mission
            </h3>
            <p className="text-gray-200 text-base">
              We’re on a mission to make street art accessible and
              unforgettable. By letting anyone instantly share art at its real
              location, we’re building a living, breathing archive of
              creativity—one snap at a time.
            </p>
          </div>
          {/* Vision Card */}
          <div className="bg-[#23232b] rounded-2xl shadow-lg p-8 flex flex-col items-center border-2 border-indigo-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.03]">
            <span className="text-4xl mb-3">👁️</span>
            <h3 className="text-2xl font-bold text-indigo-300 mb-3">
              Our Vision
            </h3>
            <p className="text-gray-200 text-base">
              We imagine a world where every wall, alley, and city is mapped and
              celebrated for its art. ArtOut empowers artists and explorers
              everywhere—no barriers, no boundaries, just pure urban expression
              for all to discover.
            </p>
          </div>
        </div>
        <div className="bg-[#23232b] rounded-2xl shadow-lg p-8 mt-8 flex flex-col items-center border-2 border-yellow-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.03]">
          <span className="text-3xl mb-2">🚀</span>
          <h3 className="text-2xl font-bold text-yellow-400 mb-2">
            Join Us While It’s Underground
          </h3>
          <p className="text-gray-200 text-base mb-2">
            We’re building the global archive of free, public creativity — and
            you can be part of it from day one.
          </p>
          <span className="italic text-pink-300">
            Snap. Discover. Remember.
          </span>
        </div>
      </div>
    </section>
  );
}
