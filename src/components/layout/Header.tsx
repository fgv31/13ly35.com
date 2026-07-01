"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/journey", label: "JOURNEY", matchPrefixes: ["/journey"] },
  { href: "/picks", label: "PICKS" },
  { href: "/paths", label: "PATHS" },
  { href: "/feed", label: "FEED" },
];

function isActive(pathname: string, link: typeof navLinks[number]) {
  if (pathname === link.href) return true;
  if (link.matchPrefixes) return link.matchPrefixes.some((p) => pathname.startsWith(p));
  return false;
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-sm font-bold tracking-wider text-white glow-white hover-glow transition-all duration-300"
            onClick={() => setMenuOpen(false)}
          >
            &lt;13LY35/&gt;
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-mono text-xs tracking-wider transition-all duration-300 ${
                  isActive(pathname, link)
                    ? "text-cyan glow-cyan"
                    : "text-white/60 hover:text-cyan neon-underline"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-cyan p-3 -mr-3 relative z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 border-t border-white/5 ${
          menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <nav className="flex flex-col bg-dark/95 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`px-6 py-4 font-mono text-xs tracking-wider border-b border-white/5 transition-all duration-300 ${
                isActive(pathname, link)
                  ? "text-cyan glow-cyan bg-cyan/5"
                  : "text-white/60 hover:text-cyan hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
