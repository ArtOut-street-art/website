export default function Contact() {
  return (
    <section id="contact" className="relative py-24">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/bg.jpg')",
        }}
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 z-0 bg-black/25" aria-hidden="true" />
      {/* Content */}
      <div className="relative z-10 max-w-xs xs:max-w-md sm:max-w-2xl mx-auto px-2 sm:px-6 text-center">
        <h2
          className="text-3xl xs:text-4xl sm:text-5xl font-extrabold mb-6 sm:mb-8 text-yellow-400 font-sunda drop-shadow"
          style={{ textShadow: "2px 2px 8px #000" }}
        >
          Get in Touch
        </h2>
        <p className="text-base xs:text-lg text-white mb-4 sm:mb-6 font-akadylan">
          Want to collaborate, share art, or just say hi? Reach out to us!
        </p>
        <a
          className="inline-block bg-pink-600 text-white font-sunda font-bold px-4 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:bg-yellow-400 hover:text-black transition-colors duration-300 text-base sm:text-lg mb-4"
          href="https://www.linkedin.com/company/artout-app/about/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Connect on LinkedIn
        </a>
        <div className="mt-4 sm:mt-6 flex justify-center gap-4 sm:gap-6">
          {/* Add social icons/links here if needed */}
        </div>
      </div>
    </section>
  );
}
