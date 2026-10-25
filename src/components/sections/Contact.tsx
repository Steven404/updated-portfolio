import { useState } from 'react';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';
import { ButtonLink } from '../ui/ButtonLink';
import { BookCallDialog } from './BookCallDialog';

const EMAIL = 'stefanosmichelakis@gmail.com';
const CAL_LINK = 'stefanos-michelakis-9okskj';

export function Contact() {
  const contentRef = useScrollFadeIn<HTMLDivElement>(0.05);
  const [bookingOpen, setBookingOpen] = useState(false);

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
          {/* A real link, so a modified click still opens Cal.com in a new tab */}
          <ButtonLink
            href={`https://cal.com/${CAL_LINK}`}
            aria-haspopup="dialog"
            onClick={e => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              setBookingOpen(true);
            }}
          >
            Book a call
          </ButtonLink>
          <ButtonLink href={`mailto:${EMAIL}`} variant="secondary">
            Send me a message
          </ButtonLink>
        </div>
      </div>

      <BookCallDialog calLink={CAL_LINK} open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  );
}
