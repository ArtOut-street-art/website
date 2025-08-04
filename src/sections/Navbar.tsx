import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#18181b] border-b border-gray-800 shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-3 sm:py-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2">
          <span className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl text-white font-artout drop-shadow leading-none">
            ArtOut
          </span>
        </a>
        <button
          className="md:hidden text-3xl text-gray-200 p-2 ml-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        {/* Desktop nav */}
        <div className="hidden md:flex flex-row space-x-4 lg:space-x-8 text-white text-base lg:text-lg font-semibold items-center">
          <a
            href="#home"
            className="hover:text-pink-400 transition-colors duration-200 py-2"
          >
            Home
          </a>
          <a
            href="#features"
            className="hover:text-pink-400 transition-colors duration-200 py-2"
          >
            Features
          </a>
          <a
            href="#about"
            className="hover:text-pink-400 transition-colors duration-200 py-2"
          >
            About
          </a>
          <a
            href="#mission"
            className="hover:text-pink-400 transition-colors duration-200 py-2"
          >
            Mission
          </a>
          <a
            href="#gallery"
            className="hover:text-pink-400 transition-colors duration-200 py-2"
          >
            Gallery
          </a>
          <a
            href="#contact"
            className="hover:text-pink-400 transition-colors duration-200 py-2"
          >
            Contact
          </a>
        </div>
        {/* Mobile drawer */}
        <div
          className={`fixed inset-0 bg-black/70 z-50 transition-opacity duration-300 ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } md:hidden`}
          onClick={() => setOpen(false)}
        >
          <nav
            className={`absolute top-0 right-0 h-full w-4/5 max-w-xs bg-[#18181b] shadow-2xl flex flex-col pt-8 px-6 transition-transform duration-300 ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="self-end text-3xl text-gray-400 mb-8"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
            <a
              href="#home"
              className="py-3 px-2 text-white text-lg font-semibold hover:text-pink-400 transition-colors"
              onClick={() => setOpen(false)}
            >
              Home
            </a>
            <a
              href="#features"
              className="py-3 px-2 text-white text-lg font-semibold hover:text-pink-400 transition-colors"
              onClick={() => setOpen(false)}
            >
              Features
            </a>
            <a
              href="#about"
              className="py-3 px-2 text-white text-lg font-semibold hover:text-pink-400 transition-colors"
              onClick={() => setOpen(false)}
            >
              About
            </a>
            <a
              href="#mission"
              className="py-3 px-2 text-white text-lg font-semibold hover:text-pink-400 transition-colors"
              onClick={() => setOpen(false)}
            >
              Mission
            </a>
            <a
              href="#gallery"
              className="py-3 px-2 text-white text-lg font-semibold hover:text-pink-400 transition-colors"
              onClick={() => setOpen(false)}
            >
              Gallery
            </a>
            <a
              href="#contact"
              className="py-3 px-2 text-white text-lg font-semibold hover:text-pink-400 transition-colors"
              onClick={() => setOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </nav>
  );
}
