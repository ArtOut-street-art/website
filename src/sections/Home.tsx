import { useRef } from "react";
// Change import to .js extension for Vite compatibility with TypeScript hooks
import { useSprayTrail } from "../hooks/useSprayTrail.js";

export default function Home() {
  const trailRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;

  useSprayTrail(trailRef);

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen w-full max-w-full overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg-floral.jpg')" }}
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 z-0 bg-black/92" aria-hidden="true" />
      {/* Spray trail canvas */}
      <div
        ref={trailRef}
        className="absolute inset-0 z-30"
        style={{ pointerEvents: "none" }}
      />
      <div className="relative z-20 flex flex-col items-center justify-center w-full min-h-screen text-center px-4 sm:px-6 py-20 max-w-6xl mx-auto">
        <img
          src="/images/artout-logo.png"
          alt="ArtOut Logo"
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-4 sm:mb-6 object-contain"
        />
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-artout mb-3 sm:mb-4 transition-all duration-500 max-w-full">
          ArtOut
        </h1>
        <p className="mt-2 text-lg sm:text-xl md:text-2xl text-white/90 font-semibold font-sunda mb-3 sm:mb-4">
          Graffiti & Street Art Around the World
        </p>
        <p className="mt-2 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed text-white/80 font-akadylan mb-6 sm:mb-8 text-center">
          Discover, capture, and share the world's most vibrant street art—live
          and on location. ArtOut lets you instantly snap and geotag graffiti,
          murals, and urban art wherever you find it. No uploads, no filters, no
          barriers—just real art, mapped in real time.
        </p>
        <a
          href="#features"
          className="inline-block bg-pink-600 text-white font-sunda font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:bg-yellow-400 hover:text-black transition-colors duration-300 text-sm sm:text-base md:text-lg mt-2"
        >
          Explore Features
        </a>
      </div>
      {/* Arrow with better positioning */}
      <div className="absolute left-1/2 -translate-x-1/2 z-30 bottom-8 sm:bottom-12 md:bottom-16 hidden sm:block hide-on-short">
        <span className="text-white text-xl sm:text-2xl md:text-3xl animate-bounce drop-shadow-lg">
          ↓
        </span>
      </div>
      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700/40 to-transparent pointer-events-none" />
    </section>
  );
}
