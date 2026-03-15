export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-dark/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        {/* Left — external links */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-magenta">[EXTERNAL]</span>
          <a href="https://github.com/fgv31" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-white/30 hover:text-cyan transition-colors duration-300">GITHUB</a>
          <a href="https://www.linkedin.com/in/francesco-villani/" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-white/30 hover:text-cyan transition-colors duration-300">LINKEDIN</a>
          <a href="mailto:hello@13ly35.com" className="font-mono text-xs text-white/30 hover:text-cyan transition-colors duration-300">EMAIL</a>
        </div>

        {/* Right — status + copyright */}
        <div className="flex items-center gap-6">
          <span className="font-mono text-xs text-cyan flex items-center gap-2">
            ONLINE
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan live-blink" />
          </span>
          <span className="font-mono text-xs text-white/20 font-bold">
            13ly35 &copy; 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
