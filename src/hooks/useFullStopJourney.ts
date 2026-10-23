import { useEffect, useRef } from 'react';

// The hero's full stop leaves the name, flies into the experience timeline
// and becomes its "now" dot; the timeline then draws back from now to the
// first role. If the "now" dot is off-screen, the full stop waits above the
// bottom edge, follows the scroll and settles once the dot is in view.
// Reduced motion, missing Web Animations support, or a full stop already
// scrolled away fall back to playing the timeline when it comes into view.

const HOLD = 250; // ms the landed full stop rests before it departs
const DOT = 13; // px, the "now" dot's diameter
const WAIT_GAP = 28; // px above the viewport bottom where the full stop waits
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

// Centre and size of the full stop's ink, in document coordinates. The span's
// box is the glyph's advance and line box, so the ink is located from the
// font's metrics.
function inkOf(stop: HTMLElement) {
  const box = stop.getBoundingClientRect();
  const style = getComputedStyle(stop);
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) return null;
  ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  const m = ctx.measureText('.');
  const baseline =
    box.top + m.fontBoundingBoxAscent + (box.height - m.fontBoundingBoxAscent - m.fontBoundingBoxDescent) / 2;
  return {
    x: box.left + (m.actualBoundingBoxRight - m.actualBoundingBoxLeft) / 2 + scrollX,
    y: baseline - (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2 + scrollY,
    w: m.actualBoundingBoxRight + m.actualBoundingBoxLeft,
    h: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent,
    top: box.top,
  };
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

export function useFullStopJourney() {
  const stopRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stop = stopRef.current;
    const timeline = timelineRef.current;
    const nowDot = timeline?.querySelector<HTMLElement>('[data-now-dot]');
    if (!stop || !timeline || !nowDot) return;

    const cleanups: Array<() => void> = [];
    let played = false;

    const play = (lineStart: number, docked: boolean) => {
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
    if (reduceMotion || typeof stop.animate !== 'function') {
      playInView();
      return () => cleanups.forEach(fn => fn());
    }

    const depart = () => {
      const ink = inkOf(stop);
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

      const hideStop = stop.animate([{ opacity: 0 }], { fill: 'forwards' });
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
        hideStop.cancel();
        traveller.remove();
      });

      // Where the full stop should be: on the "now" dot whenever that is fully
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
        hideStop.cancel();
        // The real dot would show through the squash below; it takes over after
        const hideNow = nowDot.animate([{ opacity: 0 }], { fill: 'forwards' });
        cleanups.push(() => hideNow.cancel());
        stop.animate([{ opacity: 0, transform: 'scale(0)' }, { opacity: 1, transform: 'scale(1)' }], {
          duration: 380,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        });
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
      // Condense from the glyph into the "now" dot while lifting off
      body.animate(
        [
          { transform: `scale(${ink.w / DOT}, ${ink.h / DOT})` },
          { transform: 'scale(1)', offset: 0.45 },
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

    // Depart once the name and its full stop have landed, so they are measured
    // at rest
    let cancelled = false;
    let timer = 0;
    const name = stop.closest<HTMLElement>('.hero-name');
    const entrance = [stop, name].flatMap(el => el?.getAnimations() ?? []);
    Promise.all(entrance.map(animation => animation.finished)).then(
      () => {
        if (!cancelled) timer = window.setTimeout(depart, HOLD);
      },
      () => {}
    );
    cleanups.push(() => {
      cancelled = true;
      clearTimeout(timer);
    });
    return () => cleanups.forEach(fn => fn());
  }, []);

  return { stopRef, timelineRef };
}
