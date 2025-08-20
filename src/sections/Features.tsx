export default function Features() {
  return (
    <section id="features" className="py-14 sm:py-18 w-full bg-[#18181b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-artout font-extrabold mb-8 sm:mb-12 text-gray-300 drop-shadow tracking-tight"
          style={{ letterSpacing: "0.04em" }}
        >
          Features
        </h2>
        {/* Feature/benefit blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-8">
          {/**
           * Feature 1
           */}
          <div className="panel flex flex-col items-center p-5 sm:p-6">
            <span className="text-2xl sm:text-3xl mb-2.5">📍</span>
            <h3 className="text-base sm:text-lg font-semibold text-gray-200 mb-2.5">
              Instant Geotagging
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed text-center mb-4 flex-grow">
              Snap once—ArtOut pins the exact street & suburb instantly. No
              forms, no queue—added to the living archive in seconds.
            </p>
            <div className="w-full aspect-16-9 rounded-md overflow-hidden mt-auto">
              <img
                src="/images/gallery/nature-3.jpg"
                alt="Geotag example"
                className="img-cover"
              />
            </div>
          </div>
          {/**
           * Feature 2
           */}
          <div className="panel flex flex-col items-center p-5 sm:p-6">
            <span className="text-2xl sm:text-3xl mb-2.5">🌍</span>
            <h3 className="text-base sm:text-lg font-semibold text-gray-200 mb-2.5">
              Global Street Atlas
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed text-center mb-4 flex-grow">
              Jump cities through authentic discoveries—murals, tags & paste‑ups
              mapped moments ago, not polished promos.
            </p>
            <div className="w-full aspect-16-9 rounded-md overflow-hidden mt-auto">
              <img
                src="/images/gallery/abstract-3.jpg"
                alt="Street art"
                className="img-cover"
              />
            </div>
          </div>
          {/**
           * Feature 3
           */}
          <div className="panel flex flex-col items-center p-5 sm:p-6">
            <span className="text-2xl sm:text-3xl mb-2.5">🖌️</span>
            <h3 className="text-base sm:text-lg font-semibold text-gray-200 mb-2.5">
              Preserve What Fades
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed text-center mb-4 flex-grow">
              Walls get buffed. Your captures freeze style, texture & context— a
              time capsule of urban culture.
            </p>
            <div className="w-full aspect-16-9 rounded-md overflow-hidden mt-auto">
              <img
                src="/images/gallery/modern-3.jpg"
                alt="Urban graffiti"
                className="img-cover"
              />
            </div>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700/40 to-transparent mt-10" />
      </div>
    </section>
  );
}
