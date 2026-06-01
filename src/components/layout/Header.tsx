import { useState, useEffect } from 'react';
import { Download, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About',    href: '#about',    id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Contact',  href: '#contact',  id: 'contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen]       = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isWobbling, setIsWobbling]       = useState(false);
  const [scrolled, setScrolled]           = useState(false);

  const openMenu  = () => setIsMenuOpen(true);
  const closeMenu = () => {
    setIsMenuClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsMenuClosing(false);
    }, 200);
  };
  const toggleMenu = () => (isMenuOpen ? closeMenu() : openMenu());

  useEffect(() => {
    const HEADER_HEIGHT = 64;

    const updateActive = () => {
      const scrollY      = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight    = document.documentElement.scrollHeight;

      setScrolled(scrollY > 20);

      const sections = NAV_LINKS.map(({ id }) => {
        const el = document.getElementById(id);
        return { id, top: el ? el.getBoundingClientRect().top + scrollY : Infinity };
      });

      const nearBottom = scrollY + windowHeight >= docHeight - 4;
      if (nearBottom) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      const passed = sections.filter(({ top }) => top <= scrollY + HEADER_HEIGHT + 10);
      setActiveSection(passed.length === 0 ? '' : passed[passed.length - 1].id);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    return () => window.removeEventListener('scroll', updateActive);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full transition-all duration-300 animate-nav-enter"
      style={{
        background: scrolled
          ? 'rgba(0,49,53,0.88)'
          : 'rgba(0,49,53,0)',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(2,73,80,0.7)' : '1px solid transparent',
      }}
    >
      <div className="container mx-auto px-6 lg:px-16 xl:px-20 h-16 flex items-center justify-between relative">
        {/* Logo */}
        <a
          href="#"
          onClick={() => {
            setIsWobbling(true);
            setTimeout(() => setIsWobbling(false), 500);
          }}
          className={`text-lg font-bold tracking-[-0.04em] z-10 inline-block select-none cursor-pointer transition-colors text-sky hover:text-teal ${isWobbling ? 'animate-wobble' : ''}`}
          style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
          aria-label="Back to top"
        >
          SM
        </a>

        {/* Desktop nav — centered absolutely */}
        <nav
          className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map(({ label, href, id }) => {
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={href}
                className="nav-link text-sm font-medium inline-block"
                style={{
                  color: isActive ? '#0FA4AF' : 'rgba(175,221,229,0.65)',
                  fontFamily: '"Figtree", sans-serif',
                }}
                onMouseEnter={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = '#AFDDE5';
                }}
                onMouseLeave={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(175,221,229,0.65)';
                }}
              >
                {label}
                <span
                  className="block h-0.5 mt-0.5 rounded-full"
                  style={{
                    background: '#964734',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  aria-hidden
                />
              </a>
            );
          })}
        </nav>

        {/* Resume button */}
        <a
          href="/stefanos-michelakis-cv-english.pdf"
          download="stefanos-michelakis-cv-english.pdf"
          className="resume-btn hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold z-10"
          style={{
            background: '#964734',
            color: '#AFDDE5',
            fontFamily: '"Figtree", sans-serif',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = '#b05440';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = '#964734';
          }}
        >
          <Download size={14} aria-hidden />
          Resume
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 transition-colors"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          style={{ color: 'rgba(175,221,229,0.7)' }}
        >
          <span key={isMenuOpen ? 'open' : 'closed'} className="animate-icon-swap">
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </span>
        </button>
      </div>

      {/* Mobile nav */}
      {(isMenuOpen || isMenuClosing) && (
        <div
          className={`md:hidden absolute w-full shadow-xl ${isMenuClosing ? 'animate-menu-out' : 'animate-menu-in'}`}
          style={{
            background: 'rgba(0,49,53,0.97)',
            backdropFilter: 'blur(14px)',
            borderBottom: '1px solid rgba(2,73,80,0.7)',
          }}
        >
          <nav className="flex flex-col px-6 py-6 gap-5" aria-label="Mobile navigation">
            {NAV_LINKS.map(({ label, href, id }, i) => {
              const isActive = activeSection === id;
              return (
                <a
                  key={id}
                  href={href}
                  onClick={closeMenu}
                  className={`text-base font-medium transition-colors${isMenuClosing ? '' : ' animate-menu-item'}`}
                  style={{
                    color: isActive ? '#0FA4AF' : 'rgba(175,221,229,0.75)',
                    fontFamily: '"Figtree", sans-serif',
                    animationDelay: isMenuClosing ? undefined : `${i * 40 + 60}ms`,
                  }}
                >
                  {label}
                </a>
              );
            })}
            <a
              href="/stefanos-michelakis-cv-english.pdf"
              download="stefanos-michelakis-cv-english.pdf"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all mt-1"
              style={{
                background: '#964734',
                color: '#AFDDE5',
                fontFamily: '"Figtree", sans-serif',
              }}
            >
              <Download size={16} aria-hidden />
              Download Resume
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
