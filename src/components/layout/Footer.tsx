export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full py-8 bg-deep"
      style={{ borderTop: '1px solid rgba(2,73,80,0.7)' }}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm" style={{ color: 'rgba(175,221,229,0.45)' }}>
          &copy; {currentYear} SM. All rights reserved.
        </p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a
            href="https://github.com/Steven404"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors"
            style={{ color: 'rgba(175,221,229,0.45)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#AFDDE5'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(175,221,229,0.45)'; }}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/stefanos-michelakis-65884b230/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors"
            style={{ color: 'rgba(175,221,229,0.45)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#AFDDE5'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(175,221,229,0.45)'; }}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
