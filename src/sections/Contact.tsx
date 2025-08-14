export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-20 w-full max-w-full overflow-x-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg-floral.jpg')" }}
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 z-0 bg-black/25" aria-hidden="true" />
      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-2 sm:px-4 text-center">
        <h2
          className="text-5xl font-extrabold mb-8 text-artout-yellow font-sunda drop-shadow"
          style={{ textShadow: "2px 2px 8px #000" }}
        >
          Get in Touch
        </h2>
        <p className="text-base md:text-lg text-white mb-6 font-akadylan leading-relaxed">
          Want to collaborate, share art, or just say hi? Reach out to us!
        </p>
        <a
          className="inline-block bg-pink-600 text-white font-sunda font-bold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-400 hover:text-black transition-colors duration-300 text-lg mb-4"
          href="https://www.linkedin.com/company/artout-app/about/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Connect on LinkedIn
        </a>
        <div className="mt-6 flex justify-center gap-6">
          {/* Add social icons/links here if needed */}
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700/40 to-transparent mt-14" />
      </div>
    </section>
  );
}
