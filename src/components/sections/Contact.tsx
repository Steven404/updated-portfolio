import { useState } from 'react';
import { Copy, Check, Github, Linkedin, Mail } from 'lucide-react';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';

const EMAIL = 'stefanosmichelakis@gmail.com';

export function Contact() {
  const [copied, setCopied] = useState(false);

  const headingRef = useScrollFadeIn();
  const bodyRef    = useScrollFadeIn(0.05);
  const ctaRef     = useScrollFadeIn(0.05);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative py-28 lg:py-36 overflow-hidden"
      style={{ background: 'rgba(2,73,80,0.14)' }}
    >
      {/* Dot grid + directional glow from bottom-left — mirrors Hero from the opposite corner */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #0FA4AF 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 10% 90%, rgba(2,73,80,0.55) 0%, transparent 65%)',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-16 xl:px-20 max-w-4xl">

        <h2
          ref={headingRef as React.RefObject<HTMLHeadingElement>}
          className="opacity-0 mb-8"
          style={{
            fontFamily: '"Bricolage Grotesque", sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: '#AFDDE5',
            textWrap: 'balance',
          }}
        >
          Get in touch<span style={{ color: '#964734' }}>.</span>
        </h2>

        <p
          ref={bodyRef as React.RefObject<HTMLParagraphElement>}
          className="opacity-0 text-xl leading-relaxed mb-14"
          style={{
            color: 'rgba(175,221,229,0.65)',
            fontFamily: '"Figtree", sans-serif',
            maxWidth: '52ch',
          }}
        >
          If you're building something and need a frontend or React Native engineer, or just want to connect — send me an email. I respond to every message.
        </p>

        <div
          ref={ctaRef as React.RefObject<HTMLDivElement>}
          className="opacity-0 flex flex-col gap-10"
        >

          {/* Primary CTA */}
          <div>
            <a
              href={`mailto:${EMAIL}`}
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-sm font-semibold transition-all duration-200 bg-teal text-deep hover:brightness-110 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              style={{ fontFamily: '"Figtree", sans-serif' }}
            >
              <Mail size={15} aria-hidden />
              Send an email
            </a>
          </div>

          {/* Email display + copy */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div
              className="flex items-center gap-3 px-5 py-3.5 rounded-xl"
              style={{
                background: 'rgba(2,73,80,0.35)',
                border: '1px solid rgba(2,73,80,0.75)',
              }}
            >
              <span
                className="text-sm"
                style={{ color: 'rgba(175,221,229,0.7)', fontFamily: '"Figtree", sans-serif' }}
              >
                {EMAIL}
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
              style={{
                background: copied ? 'rgba(15,164,175,0.12)' : 'rgba(2,73,80,0.35)',
                border: '1px solid rgba(2,73,80,0.75)',
                color: copied ? '#0FA4AF' : 'rgba(175,221,229,0.5)',
                fontFamily: '"Figtree", sans-serif',
              }}
              aria-label={copied ? 'Email copied' : 'Copy email address'}
            >
              {copied
                ? <><Check size={15} aria-hidden /> Copied</>
                : <><Copy size={15} aria-hidden /> Copy</>
              }
            </button>
          </div>

          {/* Social links */}
          <div
            className="flex items-center gap-8 pt-2"
            style={{ borderTop: '1px solid rgba(2,73,80,0.5)' }}
          >
            <a
              href="https://github.com/Steven404"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
              style={{ color: 'rgba(175,221,229,0.4)', fontFamily: '"Figtree", sans-serif' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#AFDDE5'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(175,221,229,0.4)'; }}
              aria-label="GitHub profile"
            >
              <Github size={18} aria-hidden />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/stefanos-michelakis-65884b230/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
              style={{ color: 'rgba(175,221,229,0.4)', fontFamily: '"Figtree", sans-serif' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#AFDDE5'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(175,221,229,0.4)'; }}
              aria-label="LinkedIn profile"
            >
              <Linkedin size={18} aria-hidden />
              LinkedIn
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
