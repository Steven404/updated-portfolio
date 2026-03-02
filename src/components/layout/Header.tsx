import { useState } from 'react';
import { Download, Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-white tracking-tight">
          SM
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          <a href="#about" className="text-sm font-medium hover:text-white text-gray-300 transition-colors">About</a>
          <a href="#projects" className="text-sm font-medium hover:text-white text-gray-300 transition-colors">Projects</a>
          <a href="#contact" className="text-sm font-medium hover:text-white text-gray-300 transition-colors">Contact</a>
          <a
            href="/cv.pdf"
            download="cv.pdf"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Download size={16} />
            Resume
          </a>
        </nav>

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
            <a href="#about" onClick={toggleMenu} className="text-base font-medium text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#projects" onClick={toggleMenu} className="text-base font-medium text-gray-300 hover:text-white transition-colors">Projects</a>
            <a href="#contact" onClick={toggleMenu} className="text-base font-medium text-gray-300 hover:text-white transition-colors">Contact</a>
            <a
              href="/cv.pdf"
              download="cv.pdf"
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
