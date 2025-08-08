import { useState } from "react";
import { galleryData } from "../data/galleryData";

function SlideshowCard({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-[#23232b] text-white shadow-xl rounded-2xl border-2 border-indigo-400 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.03] group flex flex-col">
      <div className="relative">
        <img
          src={images[current]}
          alt={alt}
          className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
        />
        {/* Ensure buttons are clickable with z-index and pointer-events */}
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-auto z-10">
          <button
            onClick={prevImage}
            className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            &larr;
          </button>
          <button
            onClick={nextImage}
            className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            &rarr;
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end rounded-2xl">
          <span className="text-white text-lg font-semibold p-4 font-akadylan">
            {alt}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="py-24 bg-[#18181b] w-full max-w-full overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6">
        <h2
          className="text-5xl font-bold mb-14 text-yellow-400 text-center font-sunda tracking-tight"
          style={{ textShadow: "2px 2px 8px #000" }}
        >
          Street Art Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {galleryData.map((data) => (
            <SlideshowCard
              key={data.images[0]}
              images={data.images}
              alt={data.alt}
            />
          ))}
        </div>
        <p className="mt-12 text-center text-gray-400 text-lg font-akadylan">
          More coming soon. Want your art featured?{" "}
          <a
            href="#contact"
            className="text-pink-400 underline hover:text-yellow-400 transition-colors font-medium"
          >
            Contact us
          </a>
          !
        </p>
      </div>
    </section>
  );
}
