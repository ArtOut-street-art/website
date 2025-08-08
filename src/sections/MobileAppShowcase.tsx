import mobileImage from "/images/mobile-image.png";
import mobileMap from "/images/mobile-map.png";
import mobileTour from "/images/mobile-tour.png";

const mobileAppImages = [
  {
    src: mobileMap,
    alt: "Interactive Map View",
    desc: "Browse a live map of street art locations near you.",
    border: "border-pink-600",
  },
  {
    src: mobileImage,
    alt: "Artwork Details Screen",
    desc: "See detailed info and images for each artwork.",
    border: "border-yellow-400",
  },
  {
    src: mobileTour,
    alt: "Curated Art Tours",
    desc: "Follow curated tours to discover local art scenes.",
    border: "border-indigo-400",
  },
];

export default function MobileAppShowcase() {
  return (
    <section
      id="mobile-app"
      className="py-24 bg-[#18181b] w-full max-w-full overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6">
        <h2
          className="text-5xl font-bold mb-14 text-yellow-400 text-center font-sunda tracking-tight"
          style={{ textShadow: "2px 2px 8px #000" }}
        >
          ArtOut on Mobile
        </h2>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-sunda text-center">
          Explore our mobile app screenshots—see how ArtOut brings real-time
          street art mapping to your fingertips.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {mobileAppImages.map((img, i) => (
            <div
              key={img.src}
              className={`bg-[#23232b] text-white shadow-xl rounded-2xl border-2 ${img.border} overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.03] group flex flex-col items-center`}
            >
              <div className="relative w-full flex justify-center">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="object-cover w-[180px] h-[380px] rounded-xl shadow-lg bg-[#23232b] transition-transform duration-300 group-hover:scale-105 mt-6"
                  style={{ border: "4px solid #23232b" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end rounded-2xl" />
              </div>
              <div className="p-4 pb-6 flex flex-col items-center">
                <span className="text-lg font-semibold font-akadylan text-white text-center">
                  {img.alt}
                </span>
                <span className="text-gray-300 text-base mt-2 text-center font-sunda">
                  {img.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-gray-400 text-lg font-akadylan">
          See more on our{" "}
          <a
            href="https://www.linkedin.com/company/artout-app/posts/?feedView=all"
            className="text-pink-400 underline hover:text-yellow-400 transition-colors font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn page
          </a>
          !
        </p>
      </div>
    </section>
  );
}
