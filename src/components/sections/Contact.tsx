import { useState } from 'react';
import { Github, Linkedin, Mail, Phone, Copy, Check } from 'lucide-react';

export function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const email = "stefanosmichelakis@gmail.com";

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-gray-800/50">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Get In Touch
        </h2>

        <p className="text-gray-400 text-lg mb-12 leading-relaxed">
          My inbox is always open.
          Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center mb-10">
          <button
            onClick={() => handleCopy(email)}
            className="flex items-center justify-between w-full sm:w-auto min-w-[240px] px-6 py-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-colors border border-gray-800 shadow-sm gap-2"
          >
            <span className="flex items-center gap-3">
              <Mail size={20} className="text-gray-400" />
              {copiedEmail ? "Copied!" : email}
            </span>
            {copiedEmail ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-gray-500 hover:text-gray-300" />}
          </button>


        </div>

        <div className="flex items-center justify-center gap-6">
          <a
            href="https://github.com/Steven404"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors p-2"
            aria-label="GitHub Profile"
          >
            <Github size={28} />
          </a>
          <a
            href="https://www.linkedin.com/in/stefanos-michelakis-65884b230/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors p-2"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={28} />
          </a>
        </div>
      </div>
    </section>
  );
}
