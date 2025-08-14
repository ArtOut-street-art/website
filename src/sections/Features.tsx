export default function Features() {
  return (
    <section
      id="features"
      className="py-16 sm:py-20 w-full max-w-full overflow-x-hidden bg-[#18181b]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-artout font-extrabold mb-8 sm:mb-12 text-gray-300 drop-shadow tracking-tight"
          style={{ letterSpacing: "0.04em" }}
        >
          Features
        </h2>
        {/* Feature/benefit blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
          <div className="bg-[#23232b] rounded-xl p-4 sm:p-6 flex flex-col items-center min-h-[400px]">
            <span className="text-2xl sm:text-3xl mb-3">📍</span>
            <h3 className="text-lg sm:text-xl font-bold text-gray-300 mb-3 text-center">
              Instant Geotagging
            </h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed text-center mb-4 flex-grow">
              Snap once—ArtOut pins the exact street, suburb, and country
              instantly. No manual forms, no upload queue. Your find becomes
              part of a living public archive in seconds.
            </p>
            <div className="w-full h-32 rounded-lg overflow-hidden mt-auto">
              <img
                src="/images/gallery/nature-3.jpg"
                alt="Geotag example"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="bg-[#23232b] rounded-xl p-4 sm:p-6 flex flex-col items-center min-h-[400px]">
            <span className="text-2xl sm:text-3xl mb-3">🌍</span>
            <h3 className="text-lg sm:text-xl font-bold text-gray-300 mb-3 text-center">
              A Worldwide Street Gallery
            </h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed text-center mb-4 flex-grow">
              Jump between cities through real discoveries—not polished promos.
              Explore organic layers of murals, tags, and paste‑ups people just
              mapped moments ago.
            </p>
            <div className="w-full h-32 rounded-lg overflow-hidden mt-auto">
              <img
                src="/images/gallery/abstract-3.jpg"
                alt="Street art"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="bg-[#23232b] rounded-xl p-4 sm:p-6 flex flex-col items-center min-h-[400px]">
            <span className="text-2xl sm:text-3xl mb-3">🖌️</span>
            <h3 className="text-lg sm:text-xl font-bold text-gray-300 mb-3 text-center">
              Preserve What Fades
            </h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed text-center mb-4 flex-grow">
              Paint gets buffed. Walls get rebuilt. Your captures preserve
              texture, style, and place—creating a time capsule of urban culture
              that would otherwise vanish.
            </p>
            <div className="w-full h-32 rounded-lg overflow-hidden mt-auto">
              <img
                src="/images/gallery/modern-3.jpg"
                alt="Urban graffiti"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700/40 to-transparent mt-12" />
      </div>
    </section>
  );
}
