export default function Footer() {
  return (
    <footer className="bg-[#18181b] text-gray-400 py-8 text-sm font-sunda tracking-wide w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Logo and tagline */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-2">
            <img
              src="/images/artout-logo.png"
              alt="ArtOut Logo"
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-lg font-artout text-gray-300">ArtOut</h1>
          </div>
          <p className="text-gray-500 text-sm text-center md:text-left">
            Mapping the world’s street art, one wall at a time.
          </p>
        </div>

        {/* Column 2: Navigation links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-gray-300 text-base font-semibold mb-2">
            Quick Links
          </h3>
          <div className="flex flex-col gap-2">
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

        {/* Column 3: Social media links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-gray-300 text-base font-semibold mb-2">
            Follow Us
          </h3>
          <div className="flex flex-col gap-2">
            <a
              href="https://www.linkedin.com/company/artout-app/about/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-gray-300 transition-colors"
            >
              <img
                src="/images/icons/linkedin.png"
                alt="LinkedIn"
                className="w-5 h-5"
              />
              LinkedIn
            </a>
            <span className="flex items-center gap-2 text-gray-500 italic">
              <img
                src="/images/icons/instagram.png"
                alt="Instagram"
                className="w-5 h-5"
              />
              Instagram (Coming Soon)
            </span>
            <span className="flex items-center gap-2 text-gray-500 italic">
              <img
                src="/images/icons/twitter.png"
                alt="Twitter"
                className="w-5 h-5"
              />
              Twitter (Coming Soon)
            </span>
            <span className="flex items-center gap-2 text-gray-500 italic">
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

      {/* Legal and copyright */}
      <div className="mt-8 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} ArtOut. All rights reserved.</p>
        <p>
          <a href="#" className="hover:text-gray-300 transition-colors">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="#" className="hover:text-gray-300 transition-colors">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
}
