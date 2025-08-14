import mobileImage from "/images/mobile-image.png";
import mobileMap from "/images/mobile-map.png";
import mobileTour from "/images/mobile-tour.png";

// ...existing data (images + captions can remain simpler for this layout)...
const mobileAppImages = [
  {
    src: mobileMap,
    alt: "Live map nearby",
    caption: "Instant walls around you.",
  },
  {
    src: mobileImage,
    alt: "Artwork detail view",
    caption: "Raw image + location.",
  },
  {
    src: mobileTour,
    alt: "Curated route mode",
    caption: "Lightweight mural routes.",
  },
];

export default function MobileAppShowcase() {
  return (
    <section
      id="mobile-app"
      className="py-16 sm:py-20 bg-[#18181b] w-full max-w-full"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <h2
          className="text-4xl sm:text-5xl font-bold mb-5 sm:mb-6 text-gray-100 text-center font-sunda tracking-tight"
          style={{ textShadow: "2px 2px 6px #000" }}
        >
          ArtOut on Mobile
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-10 max-w-2xl mx-auto font-sunda text-center leading-relaxed">
          Field-first street art capture: open the map, spot a wall, snap, it’s
          pinned. Explore new finds, open raw context, or trace a micro‑route.
        </p>

        {/* Restored unified height strip */}
        <div
          className="relative w-full rounded-xl flex gap-10 sm:gap-12 justify-center items-end bg-[#23232b]/40 p-6 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
          style={{ height: "60vh", minHeight: "500px", maxHeight: "700px" }}
        >
          {mobileAppImages.map((img, i) => (
            <div
              key={img.src}
              className="flex flex-col items-center snap-center h-full"
            >
              <div className="h-full flex items-end">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="h-full w-auto max-w-[26vw] min-w-[170px] object-cover rounded-2xl shadow-2xl ring-1 ring-gray-700/40 transition-transform duration-300 hover:scale-[1.04]"
                />
              </div>
              <span className="mt-4 text-xs sm:text-sm text-gray-200 font-medium tracking-wide text-center max-w-[11rem]">
                {img.alt}
              </span>
              <span className="mt-1 text-[10px] sm:text-xs text-gray-500 text-center max-w-[11rem] leading-snug">
                {img.caption}
              </span>
            </div>
          ))}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-700/40 to-transparent mt-12" />
      </div>
    </section>
  );
}
