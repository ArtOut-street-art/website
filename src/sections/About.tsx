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
        <div className="bg-[#23232b] rounded-xl p-8 shadow-lg max-w-3xl mx-auto">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-200 mb-4">
            Why It Matters
          </h3>
          <ul className="text-xs sm:text-sm text-gray-400 space-y-2">
            <li>
              • Ephemeral culture fades fast; lightweight capture extends life.
            </li>
            <li>• A bottom‑up atlas: built by walkers, riders, wanderers.</li>
            <li>
              • Context + coordinates &gt; algorithmic noise & endless scroll.
            </li>
          </ul>
          <p className="mt-6 text-pink-300 text-xs sm:text-sm italic">
            Snap • Pin • Preserve. #ArtOut #StreetArt #UrbanCulture
          </p>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700/40 to-transparent mt-14" />
      </div>
    </section>
  );
}
