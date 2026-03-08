import { useState, useEffect } from 'react';
import { Download, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isWobbling, setIsWobbling] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const HEADER_HEIGHT = 64; // h-16 = 4rem = 64px

    const updateActive = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Collect each section's top offset relative to the document
      const sections = NAV_LINKS.map(({ id }) => {
        const el = document.getElementById(id);
        return { id, top: el ? el.getBoundingClientRect().top + scrollY : Infinity };
      });

      // If we're at (or very near) the bottom of the page, activate the last section
      const nearBottom = scrollY + windowHeight >= docHeight - 4;
      if (nearBottom) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      // The "active" section is the last one whose top is at or above the
      // current scroll position + header height (i.e. it has entered the viewport).
      const passed = sections.filter(({ top }) => top <= scrollY + HEADER_HEIGHT + 10);

      if (passed.length === 0) {
        // We're above all tracked sections (Hero area) — no active link
        setActiveSection('');
      } else {
        // The last passed section is the one currently in view
        setActiveSection(passed[passed.length - 1].id);
      }
    };

    updateActive(); // run once on mount
    window.addEventListener('scroll', updateActive, { passive: true });
    return () => window.removeEventListener('scroll', updateActive);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
        {/* Logo */}
        <a
          href="#"
          onClick={() => { setIsWobbling(true); setTimeout(() => setIsWobbling(false), 500); }}
          className={`text-xl font-bold text-white tracking-tight z-10 inline-block select-none cursor-pointer ${isWobbling ? 'animate-wobble' : ''}`}
        >
          SM
        </a>

        {/* Desktop Nav — absolutely centered */}
        <nav className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map(({ label, href, id }) => {
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={href}
                className={[
                    'transition-all duration-200',
                    isActive
                      ? 'text-white font-semibold scale-110'
                      : 'text-gray-300 font-medium hover:text-white',
                    'text-sm inline-block',
                  ].join(' ')}
              >
                {label}
              </a>
            );
          })}
        </nav>

        <a
          href="/stefanos-michelakis-cv-english.pdf"
          download="stefanos-michelakis-cv-english.pdf"
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors z-10"
        >
          <Download size={16} />
          Resume
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-gray-900/95 backdrop-blur-md absolute w-full shadow-xl">
          <nav className="flex flex-col px-4 py-6 gap-6">
            {NAV_LINKS.map(({ label, href, id }) => {
              const isActive = activeSection === id;
              return (
                <a
                  key={id}
                  href={href}
                  onClick={toggleMenu}
                  className={[
                    'text-base transition-colors',
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-gray-300 font-medium hover:text-white',
                  ].join(' ')}
                >
                  {label}
                </a>
              );
            })}
            <a
              href="/stefanos-michelakis-cv-english.pdf"
              download="stefanos-michelakis-cv-english.pdf"
              onClick={toggleMenu}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors mt-2"
            >
              <Download size={18} />
              Download Resume
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
