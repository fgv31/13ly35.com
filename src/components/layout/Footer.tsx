import Link from "next/link";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/fgv31" },
  { name: "Spotify", href: "https://open.spotify.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-sm font-semibold tracking-[0.15em] uppercase">
              13LY35
            </Link>
            <p className="mt-4 text-sm text-black/50 max-w-sm leading-relaxed">
              Creative expression meets professional presence. Building digital experiences and exploring the world.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-black/30 mb-6">Navigate</p>
            <div className="flex flex-col gap-3">
              <Link href="/about" className="text-sm text-black/60 hover:text-red transition-colors duration-300">About</Link>
              <Link href="/projects" className="text-sm text-black/60 hover:text-red transition-colors duration-300">Projects</Link>
              <Link href="/taste" className="text-sm text-black/60 hover:text-red transition-colors duration-300">Taste</Link>
              <Link href="/map" className="text-sm text-black/60 hover:text-red transition-colors duration-300">Map</Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-black/30 mb-6">Connect</p>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-black/60 hover:text-red transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
              <a href="mailto:hello@13ly35.com" className="text-sm text-black/60 hover:text-red transition-colors duration-300">
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-black/30">
            © {currentYear}
          </p>
          <p className="text-xs text-black/30">
            Built with intention
          </p>
        </div>
      </div>
    </footer>
  );
}
