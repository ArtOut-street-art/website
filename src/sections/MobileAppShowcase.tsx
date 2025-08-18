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
          Field-first street art capture: open the map, spot a wall, snap, it's
          pinned. Explore new finds, open raw context, or trace a micro‑route.
        </p>

        {/* Responsive layout with larger images */}
        <div className="w-full">
          {/* Mobile: Stack vertically with larger images */}
          <div className="block sm:hidden">
            <div className="space-y-8 max-w-lg mx-auto">
              {mobileAppImages.map((img, i) => (
                <div key={img.src} className="flex flex-col items-center">
                  {/* Larger mobile container */}
                  <div className="w-full aspect-[9/16] max-w-[380px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-700/40 bg-[#1f1f22] mb-4">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="w-full h-full object-cover scale-125 transition-transform duration-300 hover:scale-[1.3]"
                      style={{ objectPosition: "center 10%" }}
                    />
                  </div>
                  <div className="text-center px-2 max-w-[380px]">
                    <h3 className="text-base text-gray-200 font-medium tracking-wide mb-1">
                      {img.alt}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {img.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Horizontal strip with larger images */}
          <div className="hidden sm:block">
            <div
              className="relative w-full rounded-xl bg-[#23232b]/40 p-6 flex gap-6 md:gap-8 justify-center items-end overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
              style={{
                height: "65vh",
                minHeight: "550px",
                maxHeight: "750px",
              }}
            >
              {mobileAppImages.map((img, i) => (
                <div
                  key={img.src}
                  className="flex flex-col items-center snap-center h-full flex-shrink-0"
                >
                  {/* Desktop: Larger images with better proportions */}
                  <div className="h-full flex items-end pb-12">
                    <div className="aspect-[9/16] h-full max-h-[550px] min-w-[220px] max-w-[300px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-700/40 bg-[#1f1f22]">
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading={i === 0 ? "eager" : "lazy"}
                        className="w-full h-full object-cover scale-125 transition-transform duration-300 hover:scale-[1.3]"
                        style={{ objectPosition: "center 10%" }}
                      />
                    </div>
                  </div>
                  <div className="mt-3 text-center max-w-[220px]">
                    <p className="text-sm text-gray-200 font-medium tracking-wide">
                      {img.alt}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 leading-snug">
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
