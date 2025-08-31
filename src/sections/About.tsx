export default function About() {
  return (
    <section id="about" className="py-16 w-full max-w-full bg-[#18181b]">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-5xl font-extrabold mb-6 text-gray-100 font-artout tracking-tight">
          About ArtOut
        </h2>
        <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-10 max-w-3xl mx-auto">
          ArtOut is the ultra‑light, field‑ready way to document street art
          before it disappears. Open the app—point, snap, done. We auto‑resolve
          city / suburb / street and pin a live, unedited photo to the shared
          map in seconds. No accounts, no feeds, no filters—just a bottom‑up,
          time‑stamped atlas of murals, tags, paste‑ups and interventions from
          Melbourne laneways to Brooklyn freight walls. Each capture preserves
          context (where), temporality (when) and texture (raw image) so
          ephemeral culture survives repaint, buff or demolition. See cities
          through their walls—and help build the living archive.
        </p>

        {/* Redesigned "Why It Matters" as three blocks with images */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="panel p-0 overflow-hidden">
            <div className="aspect-16-9 w-full">
              <img
                src="/images/gallery/nature-3.jpg"
                alt="Preservation example"
                className="img-cover"
              />
            </div>
            <div className="p-5 text-left">
              <h3 className="text-lg font-semibold text-gray-100 mb-2">
                Preserve What Fades
              </h3>
              <p className="text-gray-400 text-sm">
                Capture ephemeral walls the moment you find them — a lasting
                record of form, texture and place before repaint or removal.
              </p>
            </div>
          </div>

          <div className="panel p-0 overflow-hidden">
            <div className="aspect-16-9 w-full">
              <img
                src="/images/gallery/modern-3.jpg"
                alt="Community atlas example"
                className="img-cover"
              />
            </div>
            <div className="p-5 text-left">
              <h3 className="text-lg font-semibold text-gray-100 mb-2">
                A Bottom‑Up Atlas
              </h3>
              <p className="text-gray-400 text-sm">
                Built by walkers and wanderers — discover authentic finds mapped
                in real time across neighborhoods and cities.
              </p>
            </div>
          </div>

          <div className="panel p-0 overflow-hidden">
            <div className="aspect-16-9 w-full">
              <img
                src="/images/gallery/abstract-1.jpg"
                alt="Context & location example"
                className="img-cover"
              />
            </div>
            <div className="p-5 text-left">
              <h3 className="text-lg font-semibold text-gray-100 mb-2">
                Context Matters
              </h3>
              <p className="text-gray-400 text-sm">
                Each capture includes coordinates and a timestamp — context that
                keeps the story of the wall intact for researchers and lovers of
                street culture.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-pink-300 text-xs sm:text-sm italic">
          Snap • Pin • Preserve. #ArtOut #StreetArt #UrbanCulture
        </p>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700/40 to-transparent mt-14" />
      </div>
    </section>
  );
}
