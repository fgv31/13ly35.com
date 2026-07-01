import { useSyncExternalStore } from 'react';

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (subscribe) => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handleChange = () => {
        subscribe();
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false
  );
}
