import mobileImage from "/images/mobile-image.png";
import mobileMap from "/images/mobile-map.png";
import mobileTour from "/images/mobile-tour.png";

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
    <section id="mobile-app" className="py-14 sm:py-18 bg-[#18181b] w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <h2
          className="text-4xl sm:text-5xl font-bold mb-5 sm:mb-6 text-gray-100 text-center font-sunda tracking-tight"
          style={{ textShadow: "2px 2px 6px #000" }}
        >
          ArtOut on Mobile
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-10 max-w-2xl mx-auto font-sunda text-center leading-relaxed">
          Field-first street art capture: open the map, spot a wall, snap, it's
          pinned. Explore new finds, open raw context, or trace a micro‑route.
        </p>

        <div className="w-full">
          {/* Mobile */}
          <div className="block sm:hidden">
            <div className="space-y-6 max-w-md mx-auto">
              {mobileAppImages.map((img, i) => (
                <div key={img.src} className="flex flex-col items-center">
                  <div className="w-full aspect-9-16 max-w-[360px] rounded-xl overflow-hidden panel-soft mb-3">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="img-cover"
                    />
                  </div>
                  <div className="text-center px-1 max-w-[340px]">
                    <h3 className="text-sm text-gray-200 font-medium tracking-wide mb-0.5">
                      {img.alt}
                    </h3>
                    <p className="text-xs text-gray-500 leading-snug">
                      {img.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden sm:block">
            <div
              className="relative w-full rounded-xl panel-soft p-5 flex gap-5 md:gap-7 justify-center items-end overflow-x-auto snap-x snap-mandatory"
              style={{ minHeight: "480px" }}
            >
              {mobileAppImages.map((img, i) => (
                <div
                  key={img.src}
                  className="flex flex-col items-center snap-center h-full flex-shrink-0"
                >
                  <div className="h-full flex items-end pb-10">
                    <div className="aspect-9-16 h-full max-h-[520px] min-w-[210px] max-w-[280px] rounded-xl overflow-hidden panel-soft">
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading={i === 0 ? "eager" : "lazy"}
                        className="img-cover"
                      />
                    </div>
                  </div>
                  <div className="mt-2.5 text-center max-w-[220px]">
                    <p className="text-sm text-gray-200 font-medium tracking-wide">
                      {img.alt}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                      {img.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-700/40 to-transparent mt-12" />
      </div>
    </section>
  );
}
