export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-800 bg-gray-900 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-gray-400 text-sm">
          &copy; {currentYear} SM All rights reserved.
        </p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <span className="sr-only">GitHub</span>
            GitHub
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <span className="sr-only">LinkedIn</span>
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
