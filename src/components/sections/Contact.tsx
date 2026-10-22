import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';

const EMAIL = 'stefanosmichelakis@gmail.com';

export function Contact() {
  const contentRef = useScrollFadeIn<HTMLDivElement>(0.05);

  return (
    <section id="contact" className="border-t border-line">
      <div ref={contentRef} className="opacity-0 max-w-[1200px] mx-auto px-6 pt-28 pb-24">
        <div className="font-mono text-[13px] text-muted tracking-[0.06em]">CONTACT</div>
        <h2 className="mt-5 max-w-[900px] font-display font-bold text-[clamp(40px,6.5vw,84px)] tracking-[-0.035em] leading-none">
          Building something? Let’s talk<span className="text-accent">.</span>
        </h2>
        <p className="mt-7 max-w-[560px] text-fg-2">
          Need a frontend or React Native engineer, or just want to connect? I reply to every message.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent('Booking a call')}`}
            className="no-underline inline-flex items-center min-h-12 px-[26px] py-3.5 rounded-full bg-accent text-on-accent font-semibold transition-[filter] hover:brightness-110"
          >
            Book a call
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="no-underline inline-flex items-center min-h-12 px-6 py-[13px] rounded-full border border-line-strong hover:border-dim font-medium"
          >
            Send me a message
          </a>
        </div>
      </div>
    </section>
  );
}
