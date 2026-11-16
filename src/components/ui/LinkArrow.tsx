const DIRECTIONS = {
  /** External link: drifts up and to the right */
  'up-right':
    'transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-focus-visible:translate-x-[3px] group-focus-visible:-translate-y-[3px] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-visible:translate-x-0 motion-reduce:group-focus-visible:translate-y-0',
  /** Download: drops out the bottom and re-enters from the top (see index.css) */
  down: 'link-arrow-down',
};

interface LinkArrowProps {
  direction: keyof typeof DIRECTIONS;
  children: string;
}

/** Decorative arrow that reacts when its link, which must carry `group`, is hovered or focused. */
export function LinkArrow({ direction, children }: LinkArrowProps) {
  return (
    <>
      {' '}
      <span aria-hidden="true" className={`inline-block ${DIRECTIONS[direction]}`}>
        {children}
      </span>
    </>
  );
}
