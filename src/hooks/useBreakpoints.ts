import breakpoints from '@/models/breakpoints';
import { useState, useEffect } from 'react';

type Breakpoint = keyof typeof breakpoints;
interface BreakPointsI {
  xsDevice: boolean;
  smallDevice: boolean;
  mediumDevice: boolean;
  largeDevice: boolean;
  isTouchable: boolean;
}

const useBreakpoints = (): BreakPointsI => {
  const [category, setCategory] = useState<Breakpoint>('lg');
  const [isTouchable, setIsTouchable] = useState<boolean>(false);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = typeof window !== "undefined" ? window.innerWidth : 0;
      setWidth(width)
    };

    // Initial calculation
    handleResize();

    if (typeof window !== "undefined") window.addEventListener('resize', handleResize);
    return () => {
      if (typeof window !== "undefined") window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") setIsTouchable(('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
  }, [category]);

  return {
    xsDevice: width !== null && width <= breakpoints.xs,
    smallDevice: width !== null && width <= breakpoints.sm,
    mediumDevice: width !== null && width <= breakpoints.md,
    largeDevice: width === null || width > breakpoints.md,
    isTouchable,
  };
};

export default useBreakpoints;
