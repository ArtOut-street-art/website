export default function About() {
  return (
    <section
      id="about"
      className="py-12 lg:py-18 bg-[#18181b] relative overflow-hidden min-h-[30vh] flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 text-center relative z-30 w-full">
        <h2 className="text-6xl md:text-7xl font-bold mb-6 text-white drop-shadow tracking-tight text-center">
          About <span className="text-white font-artout">ArtOut</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl mx-auto leading-relaxed font-sunda">
          ArtOut is the world’s first real-time street art map and gallery.
          Instantly discover, tag, and navigate street art—no sign-in, no
          barriers. See recent posts, explore by artist or location, and save
          your favourites.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6 items-stretch">
          {/* Mission Card */}
          <div className="bg-gradient-to-br from-pink-400/20 via-pink-100/10 to-transparent rounded-2xl shadow-xl p-8 flex flex-col items-center border-l-4 border-pink-400 text-center h-full">
            <span className="text-4xl mb-3">🎯</span>
            <h3 className="text-2xl font-artout font-bold text-pink-400 mb-3">
              Our Mission
            </h3>
            <p className="text-gray-300 text-lg">
              Make street art accessible and unforgettable. Every snap builds a
              living, breathing archive of creativity—one wall at a time.
            </p>
          </div>
          {/* Vision Card */}
          <div className="bg-gradient-to-br from-indigo-400/20 via-indigo-100/10 to-transparent rounded-2xl shadow-xl p-8 flex flex-col items-center border-l-4 border-indigo-400 text-center h-full">
            <span className="text-4xl mb-3">👁️</span>
            <h3 className="text-2xl font-artout font-bold text-indigo-300 mb-3">
              Our Vision
            </h3>
            <p className="text-gray-300 text-lg">
              A world where every wall, alley, and city is mapped and celebrated
              for its art. No barriers, no boundaries—just pure urban
              expression.
            </p>
          </div>
          {/* Join Us Card */}
          <div className="bg-gradient-to-br from-yellow-300/20 via-yellow-100/10 to-transparent rounded-2xl shadow-xl p-8 flex flex-col items-center border-l-4 border-yellow-400 text-center h-full">
            <span className="text-3xl mb-2">🚀</span>
            <h3 className="text-2xl font-artout font-bold text-yellow-400 mb-2">
              Join Us While It’s Underground
            </h3>
            <p className="text-gray-300 text-lg mb-2">
              We’re building the global archive of free, public creativity—and
              you can be part of it from day one.
            </p>
            <span className="italic text-pink-300">
              Snap. Discover. Remember.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
