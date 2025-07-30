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
      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        <h2
          className="text-5xl font-extrabold mb-8 text-yellow-400 font-sunda drop-shadow"
          style={{ textShadow: "2px 2px 8px #000" }}
        >
          Get in Touch
        </h2>
        <p className="text-lg text-white mb-6 font-akadylan">
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
      </div>
    </section>
  );
}
