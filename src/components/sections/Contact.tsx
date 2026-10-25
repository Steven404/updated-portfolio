import { useState, useSyncExternalStore } from 'react';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';
import { ButtonLink } from '../ui/ButtonLink';
import { BookCallDialog } from './BookCallDialog';

// The address as character codes, so it never appears as plain text in the
// prerendered HTML or the JS bundle, where spam bots harvest it
const EMAIL_CODES = [
  115, 116, 101, 102, 97, 110, 111, 115, 109, 105, 99, 104, 101, 108, 97, 107, 105, 115, 64, 103, 109, 97,
  105, 108, 46, 99, 111, 109,
];
const CAL_LINK = 'stefanos-michelakis-9okskj';

const noSubscribe = () => () => {};
const mailtoHref = () => `mailto:${String.fromCharCode(...EMAIL_CODES)}`;

/** The mailto link, assembled only in the browser; the prerendered HTML gets "#". */
function useMailtoHref() {
  return useSyncExternalStore(noSubscribe, mailtoHref, () => '#');
}

export function Contact() {
  const contentRef = useScrollFadeIn<HTMLDivElement>(0.05);
  const [bookingOpen, setBookingOpen] = useState(false);
  const emailHref = useMailtoHref();

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
          <ButtonLink href={emailHref} variant="secondary">
            Send me a message
          </ButtonLink>
        </div>
      </div>

      <BookCallDialog calLink={CAL_LINK} open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  );
}
