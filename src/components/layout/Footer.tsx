import Link from "next/link";

const socialLinks = [
  { name: "GITHUB", href: "https://github.com/fgv31" },
  { name: "SPOTIFY", href: "https://open.spotify.com" },
  { name: "LINKEDIN", href: "https://linkedin.com" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="font-mono text-sm font-bold tracking-wider text-cyan">
              &lt;13LY35/&gt;
            </Link>
            <p className="mt-4 text-sm text-white/40 max-w-sm leading-relaxed font-mono">
              // Building digital experiences
              <br />
              // Exploring the matrix
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono text-xs text-magenta mb-6">NAV_LINKS</p>
            <div className="flex flex-col gap-3">
              <Link href="/about" className="font-mono text-xs text-white/50 hover:text-cyan transition-colors duration-300">./journey</Link>
              <Link href="/projects" className="font-mono text-xs text-white/50 hover:text-cyan transition-colors duration-300">./projects</Link>
              <Link href="/taste" className="font-mono text-xs text-white/50 hover:text-cyan transition-colors duration-300">./taste</Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <p className="font-mono text-xs text-magenta mb-6">EXTERNAL</p>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-white/50 hover:text-cyan transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
              <a href="mailto:hello@13ly35.com" className="font-mono text-xs text-white/50 hover:text-cyan transition-colors duration-300">
                EMAIL
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-mono text-xs text-white/20">
            © {currentYear} // ALL_RIGHTS_RESERVED
          </p>
          <p className="font-mono text-xs text-cyan/40">
            SYSTEM_STATUS: <span className="text-cyan">ONLINE</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
