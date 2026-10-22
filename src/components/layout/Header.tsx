import { useState, useEffect } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useFollowSystemTheme, useTheme } from '../../hooks/useTheme';

const NAV_LINKS = [
  { label: 'Work',    href: '#work' },
  { label: 'About',   href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const RESUME_HREF = '/stefanos-michelakis-cv-english.pdf';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  useFollowSystemTheme();

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
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-line animate-nav-enter ${
        scrolled ? 'bg-ground/90 backdrop-blur-md' : 'bg-ground'
      }`}
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
              <a key={href} href={href} className="no-underline">
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
          className={`md:hidden border-t border-line px-6 pt-3 pb-6 flex flex-col text-lg ${isMenuClosing ? 'animate-menu-out' : 'animate-menu-in'}`}
        >
          {NAV_LINKS.map(({ label, href }, i) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className={`no-underline min-h-[52px] flex items-center ${i < NAV_LINKS.length - 1 ? 'border-b border-line' : ''}${isMenuClosing ? '' : ' animate-menu-item'}`}
              style={{ animationDelay: isMenuClosing ? undefined : `${i * 40 + 60}ms` }}
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
