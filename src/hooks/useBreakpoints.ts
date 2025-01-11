import { useState, useEffect } from 'react';

type Breakpoint = 'small' | 'medium' | 'large';
interface BreakPointsI {
  smallDevice: boolean;
  mediumDevice: boolean;
  largeDevice: boolean;
  isTouchable: boolean;
}

const useBreakpoints = (): BreakPointsI => {
  const [category, setCategory] = useState<Breakpoint>('large');
  const [isTouchable, setIsTouchable] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setCategory('small');
      } else if (width <= 1024) {
        setCategory('medium');
      } else {
        setCategory('large');
      }
    };

    // Initial calculation
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    function isTouchDevice() {
      if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0)) {
        setIsTouchable(true)
      } else {
        setIsTouchable(false)
      }
    }
    isTouchDevice()
  }, [category]);

  const smallDevice = category === 'small';
  const mediumDevice = category === 'medium';
  const largeDevice = category === 'large';

  return {
    smallDevice,
    mediumDevice,
    largeDevice,
    isTouchable
  };
};

export default useBreakpoints;
