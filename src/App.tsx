import Navbar from "./sections/Navbar.tsx";
import Home from "./sections/Home.tsx";
import Features from "./sections/Features.tsx";
import MapDemo from "./sections/MapDemo.tsx";
import Gallery from "./sections/Gallery.tsx";
import About from "./sections/About.tsx";
import Contact from "./sections/Contact.tsx";
import Footer from "./sections/Footer.tsx";
import MobileAppShowcase from "./sections/MobileAppShowcase.tsx";

export default function App() {
  return (
    <div className="relative min-h-screen font-sans bg-[#18181b] pt-14 sm:pt-16">
      <a
        href="#home"
        className="fixed left-2 top-2 z-[1000] -translate-y-14 focus:translate-y-0 transition bg-pink-600 text-white px-3 py-1 rounded-md text-sm"
      >
        Skip to content
      </a>
      {/* Main content */}
      <main className="relative z-20">
        <Navbar />
        <Home />
        <About />
        <Features />
        <MapDemo />
        <MobileAppShowcase />
        <Gallery />

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
