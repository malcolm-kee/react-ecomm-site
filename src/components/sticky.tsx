import * as React from 'react';
import { useWindowEvent } from '../hooks/use-window-event';

export type StickyProps = {
  children: React.ReactNode;
  /**
   * offset from top when it is sticky.
   *
   * @default 0
   */
  offsetTop?: number;
  /**
   * z-index of the sticky wrapper when it is sticky.
   *
   * @default 1
   */
  zIndex?: number;
  /**
   * Debounce for scroll event. Lower means the stickiness change is more instant but may cause performance issue.
   *
   * @default 200
   */
  debounce?: number;
};

/**
 * A component to stick to top when you scroll over it.
 */
export const Sticky = ({
  children,
  offsetTop = 0,
  zIndex = 1,
  debounce = 200,
}: StickyProps) => {
  const [isSticky, setIsSticky] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const clientRect = React.useRef<{
    width: number;
    left: number;
    height: number;
  } | null>(null);
  const style = React.useMemo<React.CSSProperties | undefined>(
    () =>
      isSticky
        ? {
            position: 'fixed',
            top: offsetTop,
            zIndex,
            ...(clientRect.current ? clientRect.current : undefined),
          }
        : undefined,
    [isSticky, zIndex, offsetTop]
  );

  useWindowEvent(
    'scroll',
    () => {
      if (containerRef.current) {
        const {
          y,
          width,
          height,
          left,
        } = containerRef.current.getBoundingClientRect() as DOMRect;
        clientRect.current = {
          width,
          left,
          height,
        };
        if (y) {
          if (y < offsetTop && !isSticky) {
            setIsSticky(true);
          } else if (isSticky && y > offsetTop) {
            setIsSticky(false);
          }
        }
      }
    },
    {
      wait: debounce,
    }
  );

  return (
    <div ref={containerRef}>
      <div style={style}>{children}</div>
      {clientRect.current && !!clientRect.current.height && isSticky && (
        <div style={{ height: clientRect.current.height }} />
      )}
    </div>
  );
};
