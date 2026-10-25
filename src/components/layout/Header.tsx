import { useState, useEffect, useRef } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const NAV_LINKS = [
  { label: 'Work',    href: '#work' },
  { label: 'About',   href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const RESUME_HREF = '/stefanos-michelakis-cv-english.pdf';

// A section is current once its top passes this share of the viewport height
const ACTIVE_LINE = 0.4;

// The nav link whose section is on screen; none while the hero is.
function currentSection() {
  const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom) return NAV_LINKS[NAV_LINKS.length - 1].href;
  let current: string | null = null;
  for (const { href } of NAV_LINKS) {
    const top = document.querySelector(href)?.getBoundingClientRect().top;
    if (top !== undefined && top <= innerHeight * ACTIVE_LINE) current = href;
  }
  return current;
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle w-11 h-11 inline-flex items-center justify-center rounded-full border border-line-strong text-fg cursor-pointer"
      aria-label={label}
      title={label}
    >
      <span className="theme-toggle-tilt relative w-5 h-5" aria-hidden>
        <Sun
          size={20}
          strokeWidth={1.8}
          className={`theme-icon absolute inset-0 ${theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}
        />
        <Moon
          size={20}
          strokeWidth={1.8}
          className={`theme-icon absolute inset-0 ${theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`}
        />
      </span>
    </button>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen]       = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [isWobbling, setIsWobbling]       = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [active, setActive]               = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

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
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 20);
      setActive(currentSection());
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // The open menu overlays the page: Escape or a tap outside the header closes it
  useEffect(() => {
    if (!isMenuOpen || isMenuClosing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) closeMenu();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  });

  return (
    <header
      ref={headerRef}
      data-scrolled={scrolled}
      className="site-header sticky top-0 z-50 w-full animate-nav-enter"
    >
      <nav
        className="max-w-[1200px] mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4"
        aria-label="Main"
      >
        <a
          href="#top"
          onClick={() => {
            setIsWobbling(true);
            setTimeout(() => setIsWobbling(false), 500);
          }}
          className={`font-display font-bold text-xl text-fg no-underline inline-block select-none ${isWobbling ? 'animate-wobble' : ''}`}
          aria-label="Back to top"
        >
          SM<span className="text-accent">.</span>
        </a>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-wrap items-center gap-7 text-[15px]">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                aria-current={active === href ? 'location' : undefined}
                className={`relative no-underline after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5 after:rounded-full after:bg-accent after:origin-left after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:after:transition-none ${
                  active === href ? 'after:scale-x-100' : 'after:scale-x-0'
                }`}
              >
                {label}
              </a>
            ))}
            <a
              href={RESUME_HREF}
              download
              className="no-underline inline-flex items-center min-h-11 px-[18px] py-2.5 rounded-full border border-line-strong"
            >
              Resume ↓
            </a>
          </div>

          <ThemeToggle />

          <button
            type="button"
            className="md:hidden w-11 h-11 inline-flex items-center justify-center rounded-full border border-line-strong text-fg cursor-pointer"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span key={isMenuOpen ? 'open' : 'closed'} className="animate-icon-swap">
              {isMenuOpen ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      {(isMenuOpen || isMenuClosing) && (
        <div
          id="mobile-menu"
          className={`md:hidden absolute inset-x-0 top-full bg-ground border-b border-line shadow-[0_16px_32px_-12px_rgb(0_0_0/0.35)] px-6 pt-3 pb-6 flex flex-col text-lg ${isMenuClosing ? 'animate-menu-out' : 'animate-menu-in'}`}
        >
          {NAV_LINKS.map(({ label, href }, i) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className={`no-underline min-h-[52px] flex items-center ${i < NAV_LINKS.length - 1 ? 'border-b border-line' : ''}${isMenuClosing ? '' : ' animate-menu-item'}`}
            >
              {label}
            </a>
          ))}
          <a
            href={RESUME_HREF}
            download
            onClick={closeMenu}
            className="mt-4 no-underline min-h-12 flex items-center justify-center rounded-full border border-line-strong text-base font-medium"
          >
            Download resume ↓
          </a>
        </div>
      )}
    </header>
  );
}
