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
          backgroundImage: "url('/images/bg.jpg')",
        }}
        aria-hidden="true"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 z-10 bg-black/85" aria-hidden="true" />
      {/* Spray trail canvas */}
      <div
        ref={trailRef}
        className="absolute inset-0 z-20"
        style={{ pointerEvents: "auto" }}
      />
      <div className="relative z-30 flex flex-col items-center justify-center w-full h-full text-center max-w-3xl mx-auto px-4">
        <img
          src="/images/artout-logo.png"
          alt="ArtOut Logo"
          className="w-32 h-32 sm:w-40 sm:h-40 mb-2 sm:mb-3 object-contain"
        />
        <h1 className="text-8xl md:text-9xl font-artout mb-2 text-white leading-none">
          ArtOut
        </h1>
        <p className="text-2xl md:text-3xl text-gray-200 font-sunda mb-3">
          The Real-Time Street Art Map
        </p>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 font-akadylan mb-4 text-center">
          Instantly discover, tag, and explore street art around you. Snap a
          photo, geotag it live, and see it appear on the map for everyone—no
          sign-in, no filters, just pure urban creativity.
        </p>
        <a
          href="#features"
          className="inline-block bg-pink-600 text-gray-200 font-sunda font-bold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-400 hover:text-black transition-colors duration-300 text-lg mt-1"
        >
          Explore Features
        </a>
      </div>
      {/* Ensure the arrow is always visible and not cut off */}
      <div className="arrow-down absolute left-1/2 -translate-x-1/2 z-40 bottom-8 sm:bottom-12">
        <span className="text-gray-300 text-2xl sm:text-3xl animate-bounce">
          ↓
        </span>
      </div>
      {/* Responsive arrow position */}
    </section>
  );
}
