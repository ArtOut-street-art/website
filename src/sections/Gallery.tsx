export default function Gallery() {
  return (
    <section id="gallery" className="py-12 bg-[#18181b]">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className="text-5xl md:text-6xl font-bold mb-6 text-yellow-400 drop-shadow tracking-tight text-center"
          style={{ textShadow: "2px 2px 8px #000" }}
        >
          Street Art Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {(
            [
              { src: "/images/gallery1.jpg", alt: "Urban Floral Mural" },
              { src: "/images/gallery2.jpg", alt: "Colorful Wall Art" },
              { src: "/images/bg2.png", alt: "Classic Graffiti" },
              { src: "/images/gallery4.jpg", alt: "Modern Street Art" },
              { src: "/images/gallery5.jpg", alt: "Abstract Spray" },
              { src: "/images/gallery6.jpg", alt: "Nature & Art" },
            ] as const
          ).map((img, i) => (
            <div
              key={img.src}
              className={`bg-[#23232b] text-gray-200 shadow-xl rounded-2xl border-0 md:border-2 ${
                i % 3 === 0
                  ? "md:border-pink-600"
                  : i % 3 === 1
                  ? "md:border-yellow-400"
                  : "md:border-indigo-400"
              } overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.03] group flex flex-col`}
            >
              <div className="relative">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="object-cover w-full h-40 xs:h-52 sm:h-64 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end rounded-2xl">
                  <span className="text-gray-300 text-lg font-semibold p-4 font-akadylan">
                    {img.alt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 sm:mt-6 text-center text-gray-500 text-base sm:text-lg font-akadylan">
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
