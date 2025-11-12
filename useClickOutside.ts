import { useEffect, RefObject } from 'react';

type Handler = (event: MouseEvent) => void;

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener as any);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener as any);
    };
  }, [ref, handler]);
};