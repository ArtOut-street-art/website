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
      className="relative flex flex-col items-center justify-center min-h-screen h-screen w-full py-0 overflow-hidden bg-[#23232b]"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/bg-floral.jpg')",
        }}
        aria-hidden="true"
      />
      {/* Spray trail canvas */}
      <div
        ref={trailRef}
        className="absolute inset-0 z-10"
        style={{ pointerEvents: "auto" }}
      />
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center max-w-3xl mx-auto px-4">
        <img
          src="/images/artout-logo.png"
          alt="ArtOut Logo"
          className="w-32 h-32 sm:w-40 sm:h-40 mb-2 sm:mb-3 object-contain"
        />
        <p className="mt-1 text-2xl md:text-3xl text-gray-300 font-semibold font-sunda mb-2 sm:mb-3">
          Graffiti & Street Art Around the World
        </p>
        <p className="mt-1 max-w-2xl mx-auto text-lg md:text-xl text-gray-400 font-akadylan mb-3 sm:mb-4 text-center">
          Discover, capture, and share the world’s most vibrant street art—live
          and on location. ArtOut lets you instantly snap and geotag graffiti,
          murals, and urban art wherever you find it. No uploads, no filters, no
          barriers—just real art, mapped in real time. See the world through its
          walls.
        </p>
        <a
          href="#features"
          className="inline-block bg-pink-600 text-gray-200 font-sunda font-bold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-400 hover:text-black transition-colors duration-300 text-lg mt-1"
        >
          Explore Features
        </a>
      </div>
      {/* Ensure the arrow is always visible and not cut off */}
      <div className="arrow-down absolute left-1/2 -translate-x-1/2 z-30 bottom-8 sm:bottom-12">
        <span className="text-gray-300 text-2xl sm:text-3xl animate-bounce">
          ↓
        </span>
      </div>
      {/* Responsive arrow position */}
    </section>
  );
}
