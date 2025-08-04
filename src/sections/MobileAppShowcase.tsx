const mobileAppImages = [
  // Replace these URLs with direct image links from your LinkedIn posts or your /images folder
  "https://media.licdn.com/dms/image/D4E22AQF7Qn6kQw8w9g/feedshare-shrink_800/0/1717430000000?e=1721865600&v=beta&t=example1",
  "https://media.licdn.com/dms/image/D4E22AQG8j8kQw8w9g/feedshare-shrink_800/0/1717430000001?e=1721865600&v=beta&t=example2",
  "https://media.licdn.com/dms/image/D4E22AQH9kQw8w9g/feedshare-shrink_800/0/1717430000002?e=1721865600&v=beta&t=example3",
];

export default function MobileAppShowcase() {
  return (
    <section id="mobile-app" className="py-20 bg-[#18181b]">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2
          className="text-3xl xs:text-4xl sm:text-5xl font-bold mb-8 text-yellow-400 font-sunda tracking-tight"
          style={{ textShadow: "2px 2px 8px #000" }}
        >
          See ArtOut in Action on Mobile
        </h2>
        <p className="text-lg text-white mb-10 max-w-2xl mx-auto">
          Here’s how the ArtOut app looks and feels on your phone. Snap, tag,
          and explore street art in real time—wherever you are.
        </p>
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          {mobileAppImages.map((src, i) => (
            <div
              key={i}
              className="bg-[#23232b] rounded-2xl shadow-xl p-4 flex flex-col items-center border-2 border-yellow-400 w-[220px]"
            >
              <img
                src={src}
                alt={`ArtOut mobile app screenshot ${i + 1}`}
                className="rounded-xl shadow-lg w-[180px] h-[380px] object-cover bg-black"
                style={{ border: "4px solid #fff" }}
              />
            </div>
          ))}
        </div>
        <p className="mt-8 text-gray-400 text-base">
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
