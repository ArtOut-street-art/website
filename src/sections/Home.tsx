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
      className="relative flex flex-col items-center justify-center min-h-screen h-screen w-full py-0 overflow-hidden"
      style={{
        backgroundImage: "url('/images/bg-floral.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/80 z-0" />
      {/* Spray trail canvas */}
      <div
        ref={trailRef}
        className="absolute inset-0 z-10"
        style={{ pointerEvents: "auto" }}
      />
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
        <img
          src="/images/artout-logo.png"
          alt="ArtOut Logo"
          className="w-20 h-20 sm:w-28 sm:h-28 mb-4 sm:mb-6 object-contain"
        />
        <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-artout mb-2 sm:mb-4 text-white transition-all duration-500">
          ArtOut
        </h1>
        <p className="mt-2 text-lg xs:text-xl sm:text-2xl md:text-3xl text-white/90 font-semibold font-sunda mb-4 sm:mb-6">
          Graffiti & Street Art Around the World
        </p>
        <p className="mt-2 max-w-xs xs:max-w-md sm:max-w-2xl mx-auto text-base xs:text-lg md:text-xl text-white/80 font-akadylan mb-6 sm:mb-8 text-center">
          Discover, capture, and share the world’s most vibrant street art—live
          and on location. ArtOut lets you instantly snap and geotag graffiti,
          murals, and urban art wherever you find it. No uploads, no filters, no
          barriers—just real art, mapped in real time. See the world through its
          walls.
        </p>
        <a
          href="#features"
          className="inline-block bg-pink-600 text-white font-sunda font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:bg-yellow-400 hover:text-black transition-colors duration-300 text-base sm:text-lg mt-2"
        >
          Explore Features
        </a>
      </div>
      {/* Ensure the arrow is always visible and not cut off */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-30"
        style={{ bottom: 16 }}
      >
        <span className="text-white text-2xl sm:text-3xl animate-bounce">
          ↓
        </span>
      </div>
    </section>
  );
}
