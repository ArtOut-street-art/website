export default function MissionVision() {
  return (
    <section id="mission" className="py-20 bg-[#23232b]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-4 items-center">
        <div className="flex flex-col items-start">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-2">🎯</span>
            <h3 className="text-3xl font-extrabold font-artout text-pink-400">
              Our Mission
            </h3>
          </div>
          <p className="text-lg text-white font-akadylan mb-2">
            ArtOut exists to turn courageous ideas into working products while
            giving volunteers a place to learn, ship, and shine. We rally
            builders and founders around a single goal:{" "}
            <span className="italic text-yellow-400 font-akadylan">
              launch something that matters
            </span>
            .
          </p>
        </div>
        <div className="flex flex-col items-start">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-2">👁️</span>
            <h3 className="text-3xl font-extrabold font-artout text-yellow-400">
              Our Vision
            </h3>
          </div>
          <p className="text-lg text-white font-akadylan mb-2">
            We imagine a world where talent and ambition are all you need to
            build a startup—funding optional. Every city, every wall, every
            artist: mapped, celebrated, and shared.
          </p>
        </div>
      </div>
    </section>
  );
}
