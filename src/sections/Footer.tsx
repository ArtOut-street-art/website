export default function Footer() {
  return (
    <footer className="bg-[#18181b] text-yellow-400 py-4 sm:py-6 text-center font-semibold tracking-wide text-xs xs:text-sm sm:text-base">
      © {new Date().getFullYear()}{" "}
      <span
        className="font-artout text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 via-pink-400 to-indigo-400"
        style={{ letterSpacing: "0.04em" }}
      >
        ArtOut
      </span>
      . All rights reserved.
    </footer>
  );
}
