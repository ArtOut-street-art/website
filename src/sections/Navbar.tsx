import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#18181b] border-b border-gray-800 shadow-lg sticky top-0 z-50 transition-all duration-300 w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 sm:px-6 w-full">
        <a href="#home" className="flex items-center gap-2 min-w-0">
          <span className="whitespace-nowrap text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-artout drop-shadow">
            ArtOut
          </span>
        </a>
        <button
          className="md:hidden text-3xl text-gray-200"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <div
          className={`${
            open ? "block" : "hidden"
          } absolute top-full right-0 w-full bg-[#18181b] shadow-lg md:static md:block md:bg-transparent md:shadow-none transition-all duration-300`}
        >
          <div className="flex flex-col md:flex-row md:space-x-8 text-white text-lg px-6 md:px-0 py-4 md:py-0 justify-end items-end md:items-center w-full max-w-full overflow-x-hidden">
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
              href="#mission"
              className="hover:text-pink-400 transition-colors duration-200 py-2 md:py-0"
            >
              Mission
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
