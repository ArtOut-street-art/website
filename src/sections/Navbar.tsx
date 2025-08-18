import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="backdrop-blur-md bg-[#18181b]/90 border-b border-gray-800 shadow-lg fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-14 sm:h-16 px-4 sm:px-6 w-full">
        <a
          href="#home"
          className="flex items-center gap-2 min-w-0 flex-shrink-0"
        >
          <img
            src="/images/artout-logo.png"
            alt="ArtOut Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain flex-shrink-0"
          />
          <span className="whitespace-nowrap text-lg sm:text-xl md:text-2xl text-white font-artout drop-shadow">
            ArtOut
          </span>
        </a>
        <button
          className="md:hidden text-2xl text-gray-200 p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <div
          className={`${
            open ? "block" : "hidden"
          } absolute top-full left-0 right-0 bg-[#18181b]/95 backdrop-blur-md shadow-lg md:static md:block md:bg-transparent md:shadow-none md:w-auto transition-all duration-300 border-t border-gray-700 md:border-0`}
        >
          <div className="flex flex-col md:flex-row md:space-x-4 lg:space-x-6 text-white text-sm md:text-base px-4 md:px-0 py-3 md:py-0 justify-center md:justify-end items-center space-y-2 md:space-y-0">
            <a
              href="#home"
              className="hover:text-pink-400 transition-colors duration-200 py-2 md:py-0"
            >
              Home
            </a>
            <a
              href="#features"
              className="hover:text-pink-400 transition-colors duration-200 py-2 md:py-0"
            >
              Features
            </a>
            <a
              href="#about"
              className="hover:text-pink-400 transition-colors duration-200 py-2 md:py-0"
            >
              About
            </a>
            <a
              href="#map"
              className="hover:text-pink-400 transition-colors duration-200 py-2 md:py-0"
            >
              Map
            </a>
            <a
              href="#gallery"
              className="hover:text-pink-400 transition-colors duration-200 py-2 md:py-0"
            >
              Gallery
            </a>

            <a
              href="#contact"
              className="hover:text-pink-400 transition-colors duration-200 py-2 md:py-0"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
