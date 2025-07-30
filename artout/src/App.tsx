import Navbar from "./sections/Navbar.tsx";
import Home from "./sections/Home.tsx";
import Features from "./sections/Features.tsx";
import About from "./sections/About.tsx";
import Gallery from "./sections/Gallery.tsx";
import Contact from "./sections/Contact.tsx";
import Footer from "./sections/Footer.tsx";

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/bg.jpg')",
        }}
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/35" aria-hidden="true" />
      {/* Main content */}
      <div className="relative z-20">
        <Navbar />
        <Home />
        <Features />
        <About />
        <Gallery />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
