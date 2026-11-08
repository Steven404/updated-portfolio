import { useEffect, useRef } from 'react';

// The caret that typed the hero's name leaves it, condenses into a dot on
// its way down into the experience timeline and becomes its "now" dot; the
// timeline then draws back from now to the first role. If the "now" dot is
// off-screen, the dot waits above the bottom edge, follows the scroll and
// settles once the "now" dot is in view.
// The page holds still until the caret departs, since scrolling it away
// first would skip the journey; trying to scroll finishes the typing at once
// and sends the caret off. Reduced motion, missing Web Animations support,
// or a name already scrolled away fall back to playing the timeline when it
// comes into view.

const HOLD = 250; // ms the caret rests after the last letter before it departs
const DOT = 13; // px, the "now" dot's diameter
const WAIT_GAP = 28; // px above the viewport bottom where the dot waits
const DOCK_MARGIN = 4; // px the "now" dot must clear the viewport bottom by to count as in view
const FOLLOW = 0.18; // share of the remaining distance covered per frame while following
const LINE_MS = { horizontal: 1000, vertical: 800 };

// Inverse of the line's ease-in-out (cubic-bezier(0.37, 0, 0.63, 1) ≈ sine):
// the share of the duration at which the line has covered share `p` of its length.
const lineTimeAt = (p: number) => Math.acos(1 - 2 * p) / Math.PI;

interface Point {
  x: number;
  y: number;
}

// Centre and size of the caret, in document coordinates. It is the ::after
// of the name's last letter, so it is located from that pseudo-element's
// resolved geometry.
function caretOf(host: HTMLElement) {
  const box = host.getBoundingClientRect();
  const caret = getComputedStyle(host, '::after');
  const w = parseFloat(caret.width);
  const h = parseFloat(caret.height);
  const left = box.left + parseFloat(caret.left) + parseFloat(caret.marginLeft);
  const top = box.top + parseFloat(caret.top);
  if (![w, h, left, top].every(Number.isFinite)) return null;
  return { x: left + w / 2 + scrollX, y: top + h / 2 + scrollY, w, h, top };
}

function centreOf(el: HTMLElement): Point {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2 + scrollX, y: r.top + r.height / 2 + scrollY };
}

// Times each role to the moment the drawing line reaches it, measured from
// the layout so it holds at any width and for either line.
function timeRoles(timeline: HTMLElement) {
  const line = [...timeline.querySelectorAll<HTMLElement>('.hero-line, .hero-line-v')].find(
    el => el.getClientRects().length > 0
  );
  const parent = line?.offsetParent?.getBoundingClientRect();
  if (!line || !parent) return;

  const vertical = line.classList.contains('hero-line-v');
  const duration = vertical ? LINE_MS.vertical : LINE_MS.horizontal;
  // offset* ignore the line's paused scale(0)
  const top = parent.top + line.offsetTop;
  const right = parent.left + line.offsetLeft + line.offsetWidth;
  timeline.style.setProperty('--line-dur', `${duration}ms`);

  timeline.querySelectorAll<HTMLElement>('.hero-step').forEach(step => {
    const node = step.querySelector<HTMLElement>('.hero-node')?.getBoundingClientRect();
    if (!node) return;
    const share = vertical
      ? (node.top + node.height / 2 - top) / line.offsetHeight
      : (right - (node.left + node.width / 2)) / line.offsetWidth;
    const reach = lineTimeAt(Math.min(1, Math.max(0, share))) * duration;
    step.style.setProperty('--reach', `${Math.round(reach)}ms`);
  });
}

// Samples a quadratic curve from `from` to `to` that rises before it falls.
function arc(from: Point, to: Point, steps = 24) {
  const lift = Math.min(90, Math.hypot(to.x - from.x, to.y - from.y) * 0.25);
  const control = { x: from.x + (to.x - from.x) * 0.3, y: Math.min(from.y, to.y) - lift };
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const u = 1 - t;
    return {
      x: u * u * from.x + 2 * u * t * control.x + t * t * to.x,
      y: u * u * from.y + 2 * u * t * control.y + t * t * to.y,
    };
  });
}

const at = ({ x, y }: Point) => `translate(${x}px, ${y}px)`;

const SCROLL_KEYS = new Set([' ', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End']);

// Holds the page at its current scroll, calling `onAttempt` whenever the
// visitor tries to scroll. Wheel, touch and keys are blocked outright; any
// other scroll (a scrollbar drag) is put back. A click lets go, so a link
// pressed during the hold still takes the visitor where it points.
function holdScroll(onAttempt: () => void) {
  const y = scrollY;
  const block = (event: Event) => {
    if (event instanceof KeyboardEvent && !SCROLL_KEYS.has(event.key)) return;
    event.preventDefault();
    onAttempt();
  };
  const restore = () => {
    if (scrollY !== y) scrollTo({ top: y, behavior: 'instant' });
  };
  const release = () => {
    removeEventListener('wheel', block);
    removeEventListener('touchmove', block);
    removeEventListener('keydown', block);
    removeEventListener('scroll', restore);
    removeEventListener('click', release, true);
  };
  addEventListener('wheel', block, { passive: false });
  addEventListener('touchmove', block, { passive: false });
  addEventListener('keydown', block);
  addEventListener('scroll', restore, { passive: true });
  addEventListener('click', release, true);
  return release;
}

export function useCaretJourney() {
  const caretRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = caretRef.current;
    const timeline = timelineRef.current;
    const nowDot = timeline?.querySelector<HTMLElement>('[data-now-dot]');
    const name = host?.closest<HTMLElement>('.hero-name');
    const hero = host?.closest<HTMLElement>('.hero');
    if (!host || !timeline || !nowDot || !name || !hero) return;

    const cleanups: Array<() => void> = [];
    let played = false;

    // The rest of the hero follows the caret: the copy as it leaves the name,
    // the actions once it lands
    const named = () => hero.classList.add('is-named');
    const landed = () => hero.classList.add('is-landed');
    cleanups.push(() => hero.classList.remove('is-named', 'is-landed'));

    const play = (lineStart: number, docked: boolean) => {
      landed();
      if (played) return;
      played = true;
      timeRoles(timeline);
      timeline.style.setProperty('--line-start', `${lineStart}ms`);
      timeline.classList.toggle('is-docked', docked);
      timeline.classList.add('is-playing');
    };

    // Fallback: play once the timeline is in view; straight away if it is in
    // view on load (after the name), almost at once if scrolled to later.
    const playInView = () => {
      named();
      landed();
      const mountedAt = performance.now();
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          play(performance.now() - mountedAt > 400 ? 150 : 650, false);
        },
        { threshold: 0.3 }
      );
      observer.observe(timeline);
      cleanups.push(() => observer.disconnect());
    };

    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || typeof host.animate !== 'function') {
      playInView();
      return () => cleanups.forEach(fn => fn());
    }

    let releaseScroll = () => {};

    const depart = () => {
      named();
      // In flight, scrolling is followed rather than lost
      releaseScroll();
      const ink = caretOf(host);
      // The caret goes either way: it leaves as the dot, or simply stops
      host.classList.add('caret-gone');
      cleanups.push(() => host.classList.remove('caret-gone'));
      const headerBottom = document.querySelector('header')?.getBoundingClientRect().bottom ?? 0;
      if (!ink || ink.top < headerBottom || ink.top > innerHeight) {
        playInView();
        return;
      }

      const traveller = document.createElement('span');
      const body = document.createElement('span');
      traveller.className = 'hero-traveller';
      traveller.setAttribute('aria-hidden', 'true');
      traveller.append(body);
      document.body.append(traveller);

      let frame = 0;
      let flight: Animation | null = null;

      const stopListening = () => {
        removeEventListener('scroll', schedule);
        removeEventListener('resize', schedule);
        cancelAnimationFrame(frame);
      };
      cleanups.push(() => {
        stopListening();
        flight?.cancel();
        traveller.remove();
      });

      // Where the dot should be: on the "now" dot whenever that is fully
      // in view (even just above the bottom edge, as on short phones), otherwise
      // waiting above the bottom edge in line with it.
      const target = () => {
        const now = centreOf(nowDot);
        const bottom = scrollY + innerHeight;
        const docked = now.y + DOT / 2 + DOCK_MARGIN <= bottom;
        return { x: now.x, y: docked ? now.y : bottom - WAIT_GAP, docked };
      };

      const dock = () => {
        stopListening();
        play(0, true);
        // The real dot would show through the squash below; it takes over after
        const hideNow = nowDot.animate([{ opacity: 0 }], { fill: 'forwards' });
        cleanups.push(() => hideNow.cancel());
        body
          .animate(
            [
              { transform: 'scale(1)' },
              { transform: 'scale(1.3, 0.72)', offset: 0.3 },
              { transform: 'scale(0.92, 1.08)', offset: 0.65 },
              { transform: 'scale(1)' },
            ],
            { duration: 280, easing: 'ease-out' }
          )
          .finished.then(
            () => {
              hideNow.cancel();
              traveller.remove();
            },
            () => {}
          );
      };

      // Follow the target with a little lag until it is the docked "now" dot.
      let pos: Point = { x: 0, y: 0 };
      const follow = () => {
        frame = 0;
        const goal = target();
        pos = { x: pos.x + (goal.x - pos.x) * FOLLOW, y: pos.y + (goal.y - pos.y) * FOLLOW };
        const settled = Math.abs(goal.x - pos.x) < 0.5 && Math.abs(goal.y - pos.y) < 0.5;
        if (settled) pos = goal;
        traveller.style.transform = at(pos);
        if (settled && goal.docked) dock();
        else if (!settled) frame = requestAnimationFrame(follow);
      };
      // Follow frames only start once the flight has landed
      function schedule() {
        if (!flight && !frame) frame = requestAnimationFrame(follow);
      }

      const from = { x: ink.x, y: ink.y };
      const to = target();
      const distance = Math.hypot(to.x - from.x, to.y - from.y);
      const duration = Math.min(1000, Math.max(650, 450 + distance * 0.6));

      traveller.style.transform = at(from);
      flight = traveller.animate(
        arc(from, to).map(point => ({ transform: at(point) })),
        { duration, easing: 'cubic-bezier(0.45, 0, 0.2, 1)' }
      );
      // Shrink from the caret's bar into the "now" dot while lifting off
      body.animate(
        [
          { transform: `scale(${ink.w / DOT}, ${ink.h / DOT})`, borderRadius: '1px' },
          { transform: 'scale(1)', borderRadius: '50%', offset: 0.45 },
          { transform: 'scale(1)' },
        ],
        { duration, easing: 'ease-out' }
      );

      addEventListener('scroll', schedule, { passive: true });
      addEventListener('resize', schedule);
      flight.finished.then(
        () => {
          flight = null;
          pos = to;
          traveller.style.transform = at(pos);
          // Waiting: a couple of gentle bobs so it reads as waiting, not stray
          if (!to.docked) {
            body.animate(
              [{ transform: 'translateY(0)' }, { transform: 'translateY(-6px)' }, { transform: 'translateY(0)' }],
              { duration: 900, iterations: 2, easing: 'ease-in-out', delay: 200 }
            );
          }
          // Lands on the dot, or picks up whatever scrolling happened mid-flight
          follow();
        },
        () => {}
      );
    };

    // Depart once the last letter is typed, with a beat for the caret to rest
    let cancelled = false;
    let rushed = false;
    let timer = 0;
    const typing = [...name.querySelectorAll<HTMLElement>('.hero-char')].flatMap(el => el.getAnimations());
    Promise.all(typing.map(animation => animation.finished)).then(
      () => {
        if (cancelled) return;
        if (rushed) depart();
        else timer = window.setTimeout(depart, HOLD);
      },
      () => {}
    );
    // Only while the name is on screen; a page opened further down scrolls freely.
    // A scroll attempt finishes the typing (letters and carets) and departs at once.
    const heading = name.getBoundingClientRect();
    if (heading.bottom > 0 && heading.top < innerHeight) {
      releaseScroll = holdScroll(() => {
        landed();
        if (timer) {
          clearTimeout(timer);
          timer = 0;
          depart();
        } else if (!rushed) {
          rushed = true;
          name.getAnimations({ subtree: true }).forEach(animation => animation.finish());
        }
      });
    }
    cleanups.push(() => {
      cancelled = true;
      clearTimeout(timer);
      releaseScroll();
    });

    // Pressing anything in the header ends the intro on the spot: the journey
    // is called off and every hero entrance jumps to its end, so the visitor
    // is never waiting on it to go where they asked.
    const header = document.querySelector('header');
    let skipped = false;
    const skip = (event: Event) => {
      if (skipped || !(event.target instanceof Element) || !event.target.closest('a, button')) return;
      skipped = true;
      cleanups.splice(0).forEach(fn => fn());
      host.classList.add('caret-gone');
      named();
      play(0, false);
      [...hero.getAnimations({ subtree: true }), ...(header?.getAnimations({ subtree: true }) ?? [])].forEach(
        animation => {
          // An endless animation cannot finish; it is left running
          if (animation.effect?.getComputedTiming().endTime !== Infinity) animation.finish();
        }
      );
    };
    header?.addEventListener('click', skip, true);

    return () => {
      header?.removeEventListener('click', skip, true);
      cleanups.forEach(fn => fn());
    };
  }, []);

  return { caretRef, timelineRef };
}
