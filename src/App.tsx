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
    <div className="relative min-h-screen font-sans bg-[#18181b]">
      {/* Main content */}
      <div className="relative z-20">
        <Navbar />
        <Home />
        <Features />
        <MapDemo />
        <MobileAppShowcase />
        <Gallery />
        <About />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
