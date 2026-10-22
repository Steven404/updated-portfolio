export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="max-w-[1200px] mx-auto px-6 py-7 flex flex-wrap justify-between gap-4 text-sm text-muted">
        <div className="flex gap-6">
          <a href="https://github.com/Steven404" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/stefanos-michelakis-65884b230/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <div className="font-mono text-xs">Built with React · Bricolage Grotesque &amp; Figtree</div>
      </div>
    </footer>
  );
}
