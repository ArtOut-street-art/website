export default function Contact() {
  return (
    <section id="contact" className="relative py-12 bg-[#18181b]">
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
          className="text-5xl md:text-6xl font-bold mb-6 text-yellow-400 drop-shadow tracking-tight text-center"
          style={{ textShadow: "2px 2px 8px #000" }}
        >
          Get in Touch
        </h2>
        <p className="text-base xs:text-lg text-gray-200 mb-2 sm:mb-3 font-akadylan">
          Want to collaborate, share art, or just say hi? Reach out to us!
        </p>
        <a
          className="inline-block bg-pink-600 text-gray-200 font-sunda font-bold px-4 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:bg-yellow-400 hover:text-black transition-colors duration-300 text-base sm:text-lg mb-2"
          href="https://www.linkedin.com/company/artout-app/about/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Connect on LinkedIn
        </a>
        <div className="mt-2 sm:mt-3 flex justify-center gap-4 sm:gap-6">
          {/* Add social icons/links here if needed */}
        </div>
      </div>
    </section>
  );
}
