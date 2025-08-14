export default function Footer() {
  return (
    <footer className="bg-[#18181b] text-gray-400 py-6 sm:py-8 text-xs font-sunda tracking-wide w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 items-start">
        {/* Logo, tagline, and legal */}
        <div className="flex flex-col items-center sm:items-start col-span-full sm:col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <img
              src="/images/artout-logo.png"
              alt="ArtOut Logo"
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
            />
            <h1 className="text-sm sm:text-base font-artout text-gray-300">
              ArtOut
            </h1>
          </div>
          <p className="text-gray-500 text-center sm:text-left mb-2 text-xs leading-tight">
            Mapping the world's street art, one wall at a time.
          </p>
          <p className="text-gray-500 text-center sm:text-left mb-2 text-xs">
            © {new Date().getFullYear()} ArtOut. All rights reserved.
          </p>
          <div className="text-xs text-gray-500 text-center sm:text-left">
            <a href="#" className="hover:text-gray-300 transition-colors">
              Privacy
            </a>
            {" • "}
            <a href="#" className="hover:text-gray-300 transition-colors">
              Terms
            </a>
          </div>
        </div>
        {/* Navigation links */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-gray-300 text-xs font-semibold mb-2">
            Quick Links
          </h3>
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-3 gap-y-1">
            <a href="#home" className="hover:text-gray-300 transition-colors">
              Home
            </a>
            <a
              href="#features"
              className="hover:text-gray-300 transition-colors"
            >
              Features
            </a>
            <a href="#about" className="hover:text-gray-300 transition-colors">
              About
            </a>
            <a
              href="#gallery"
              className="hover:text-gray-300 transition-colors"
            >
              Gallery
            </a>
            <a
              href="#contact"
              className="hover:text-gray-300 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
        {/* Social media links */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-gray-300 text-xs font-semibold mb-2">
            Follow Us
          </h3>
          <div className="flex flex-col gap-1">
            <a
              href="https://www.linkedin.com/company/artout-app/about/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-gray-300 transition-colors text-xs"
            >
              <img
                src="/images/icons/linkedin.png"
                alt="LinkedIn"
                className="w-4 h-4"
              />
              LinkedIn
            </a>
            <span className="flex items-center gap-1 text-gray-500 italic">
              <img
                src="/images/icons/instagram.png"
                alt="Instagram"
                className="w-5 h-5"
              />
              Instagram (Coming Soon)
            </span>
            <span className="flex items-center gap-1 text-gray-500 italic">
              <img
                src="/images/icons/twitter.png"
                alt="Twitter"
                className="w-5 h-5"
              />
              Twitter(Coming Soon)
            </span>
            <span className="flex items-center gap-1 text-gray-500 italic">
              <img
                src="/images/icons/facebook.png"
                alt="Facebook"
                className="w-5 h-5"
              />
              Facebook (Coming Soon)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
