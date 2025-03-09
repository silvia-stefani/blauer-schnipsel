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
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWidth(width)
    };

    // Initial calculation
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setIsTouchable(('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
  }, [category]);

  return {
    xsDevice: width <= breakpoints.xs,
    smallDevice: width <= breakpoints.sm,
    mediumDevice: width <= breakpoints.md,
    largeDevice: width > breakpoints.md,
    isTouchable,
  };
};

export default useBreakpoints;