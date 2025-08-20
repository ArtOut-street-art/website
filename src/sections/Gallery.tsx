import { useState, useMemo } from "react";
import { galleryData } from "../data/galleryData";

// Build one flat list of all images with derived descriptions
// (Adds index if a group has multiple images)
const buildSlides = () =>
  galleryData.flatMap((group) =>
    group.images.map((src, i) => ({
      src,
      alt:
        group.images.length > 1
          ? `${group.alt} (${i + 1}/${group.images.length})`
          : group.alt,
      baseAlt: group.alt,
    }))
  );

const slideMeta: Record<string, string> = {
  "Urban Floral Mural": "Botanical bursts layered over aging brick textures.",
  "Colorful Wall Art": "Chromatic blends and bold letter forms in motion.",
  "Classic Graffiti": "Raw foundations: throwies, fills, outlines, lineage.",
  "Modern Street Art": "Large format storytelling with contemporary palettes.",
  "Abstract Spray": "Non‑literal color fields, texture, rhythm & gesture.",
  "Nature & Art": "Organic motifs merging terrain, foliage and paint.",
};

export default function Gallery() {
  const slides = useMemo(buildSlides, []);
  const [index, setIndex] = useState(0);

  const total = slides.length;
  const current = slides[index];

  const go = (delta: number) => setIndex((i) => (i + delta + total) % total);

  const goTo = (i: number) => setIndex(i);

  return (
    <section
      id="gallery"
      className="py-14 sm:py-16 bg-[#18181b] w-full max-w-full overflow-hidden"
    >
      <div className="gallery-shell px-4 sm:px-6 items-center">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-10 text-artout-yellow text-center font-sunda tracking-tight"
          style={{ textShadow: "2px 2px 8px #000" }}
        >
          Street Art Gallery
        </h2>
        <div className="h-[3px] w-28 bg-gradient-to-r from-artout-yellow via-artout-blue to-artout-yellow rounded-full mb-6 sm:mb-8" />
        <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed text-center px-2">
          Street art is fragile—buffed, capped, repainted, erased. This gallery
          is a living archive: every capture is geotagged, time‑stamped, and
          attributed to the place it stood.
        </p>

        {/* Main image wrapper with stable aspect */}
        <div className="relative panel-soft w-full aspect-16-9 max-h-[620px] min-h-[300px] md:min-h-[380px] transition-[height] duration-300">
          <img
            key={current.src}
            src={current.src}
            alt={current.alt}
            className="img-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

          {/* Improved navigation buttons */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous image"
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-black/55 hover:bg-black/75 text-gray-200 p-2 sm:p-3 rounded-full text-lg sm:text-xl backdrop-blur transition"
          >
            ‹
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next image"
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-black/55 hover:bg-black/75 text-gray-200 p-2 sm:p-3 rounded-full text-lg sm:text-xl backdrop-blur transition"
          >
            ›
          </button>

          {/* Improved caption positioning */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/85 via-black/50 to-transparent">
            <h3 className="text-white text-sm sm:text-base md:text-lg font-semibold font-akadylan mb-1">
              {current.baseAlt}
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm leading-snug mb-1 line-clamp-2">
              {slideMeta[current.baseAlt] ||
                "Captured fragment of evolving public expression."}
            </p>
            <p className="text-gray-500 text-[11px]">
              {index + 1} / {total}
            </p>
          </div>
        </div>

        {/* Progress dots (clickable) */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-6 sm:mt-7">
          {slides.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={s.src + i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  active
                    ? "w-8 bg-pink-500 shadow-sm"
                    : "w-2.5 bg-gray-600 hover:bg-gray-400"
                }`}
              />
            );
          })}
        </div>

        <p className="mt-8 sm:mt-9 text-center text-gray-400 text-sm sm:text-base font-akadylan max-w-2xl">
          More coming soon. Want your art featured?{" "}
          <a
            href="#contact"
            className="text-pink-400 underline hover:text-yellow-400 transition-colors font-medium"
          >
            Contact us
          </a>
          !
        </p>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700/40 to-transparent mt-12 w-full" />
      </div>
    </section>
  );
}
