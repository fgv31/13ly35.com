import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-mono text-xs font-bold tracking-wider text-cyan">
            &lt;13LY35/&gt;
          </Link>
          <p className="font-mono text-[10px] text-white/20">
            © {currentYear}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/fgv31" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-white/30 hover:text-cyan transition-colors duration-300">GITHUB</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-white/30 hover:text-cyan transition-colors duration-300">LINKEDIN</a>
          <a href="mailto:hello@13ly35.com" className="font-mono text-[10px] text-white/30 hover:text-cyan transition-colors duration-300">EMAIL</a>
          <span className="font-mono text-[10px] text-cyan/40">STATUS: <span className="text-cyan">ONLINE</span></span>
        </div>
      </div>
    </footer>
  );
}
