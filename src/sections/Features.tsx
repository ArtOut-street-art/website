export default function Features() {
  return (
    <section id="features" className="py-12 bg-[#18181b]">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 text-center">
        <h2
          className="text-6xl md:text-7xl font-bold mb-6 text-white drop-shadow tracking-tight text-center"
          style={{ textShadow: "3px 3px 12px #000", letterSpacing: "0.04em" }}
        >
          Features
        </h2>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto font-sunda">
          ArtOut is the fastest way to discover, tag, and navigate street art
          worldwide. No sign-in required. Snap, tag, and share anonymously—see
          art by location, artist, or what's trending now.
        </p>
        {/* Feature/benefit blocks */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-yellow-300/20 via-yellow-100/10 to-transparent rounded-2xl shadow-lg p-6 flex flex-col items-center border-l-4 border-yellow-400">
            <span className="text-3xl mb-2">📍</span>
            <h3 className="text-xl font-artout font-bold text-yellow-400 mb-2">
              Instant Geotagging
            </h3>
            <p className="text-gray-300 text-base">
              Snap a photo and instantly tag it to your current location—no
              uploads, no waiting. Art is mapped in real time, visible to
              everyone.
            </p>
            <img
              src="/images/gallery1.jpg"
              alt="Geotag example"
              className="rounded-lg mt-4 w-full h-24 xs:h-28 sm:h-32 object-cover"
            />
          </div>
          <div className="bg-gradient-to-br from-pink-400/20 via-pink-100/10 to-transparent rounded-2xl shadow-lg p-6 flex flex-col items-center border-l-4 border-pink-400">
            <span className="text-3xl mb-2">🌍</span>
            <h3 className="text-xl font-artout font-bold text-pink-400 mb-2">
              Explore by Location & Artist
            </h3>
            <p className="text-gray-300 text-base">
              Browse art by country, state, city, or suburb. Filter by artist or
              see what's nearby. Navigate to any piece with built-in directions.
            </p>
            <img
              src="/images/gallery2.jpg"
              alt="Street art"
              className="rounded-lg mt-4 w-full h-24 xs:h-28 sm:h-32 object-cover"
            />
          </div>
          <div className="bg-gradient-to-br from-indigo-400/20 via-indigo-100/10 to-transparent rounded-2xl shadow-lg p-6 flex flex-col items-center border-l-4 border-indigo-400">
            <span className="text-3xl mb-2">🖌️</span>
            <h3 className="text-xl font-artout font-bold text-indigo-300 mb-2">
              Save & Share
            </h3>
            <p className="text-gray-300 text-base">
              Save your favourite art to revisit later. Share locations with
              friends or on social media. See recent posts and trending art
              worldwide.
            </p>
            <img
              src="/images/gallery3.jpg"
              alt="Urban graffiti"
              className="rounded-lg mt-4 w-full h-24 xs:h-28 sm:h-32 object-cover"
            />
          </div>
        </div>
        {/* How it works */}
        <div className="bg-[#23232b] rounded-2xl shadow-lg p-8 mt-8 max-w-3xl mx-auto text-left">
          <h3 className="text-2xl font-artout font-bold text-yellow-400 mb-3">
            How ArtOut Works
          </h3>
          <ul className="list-disc list-inside text-gray-300 text-base space-y-2">
            <li>
              <b>No sign-in:</b> Open the app and start exploring or tagging
              instantly.
            </li>
            <li>
              <b>Anonymous tagging:</b> Post art without creating an
              account—privacy by default.
            </li>
            <li>
              <b>See recent posts:</b> Discover the latest street art as soon as
              it's tagged.
            </li>
            <li>
              <b>Location-based:</b> Only post art at your current location—no
              uploads from elsewhere.
            </li>
            <li>
              <b>Navigate to art:</b> Get directions to any piece of art on the
              map.
            </li>
            <li>
              <b>Save to favourites:</b> Bookmark your favourite finds for easy
              access.
            </li>
            <li>
              <b>Gallery:</b> Browse a curated collection of the best street art
              worldwide.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
