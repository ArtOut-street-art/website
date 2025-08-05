export default function Contact() {
  return (
    <section id="contact" className="relative py-16 bg-[#18181b]">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/bg.jpg')",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-0 bg-black/60" aria-hidden="true" />
      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        <h2
          className="text-6xl md:text-7xl font-bold mb-6 text-white drop-shadow tracking-tight text-center"
          style={{ textShadow: "3px 3px 12px #000", letterSpacing: "0.04em" }}
        >
          Get in Touch
        </h2>
        <p className="text-lg md:text-xl text-gray-200 mb-4 font-sunda">
          Want to collaborate, share art, or just say hi? Reach out to us!
        </p>
        <a
          className="inline-block bg-pink-600 text-gray-200 font-sunda font-bold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-400 hover:text-black transition-colors duration-300 text-lg mb-4"
          href="https://www.linkedin.com/company/artout-app/about/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Connect on LinkedIn
        </a>
        <div className="mt-4 flex justify-center gap-6">
          {/* Add social icons/links here if needed */}
        </div>
      </div>
    </section>
  );
}
