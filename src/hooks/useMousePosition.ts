import { useState, useEffect } from 'react';

interface MousePositionI {
  x: number;
  y: number;
}

const useMousePosition = (): MousePositionI => {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setX(e.clientX)
      setY(e.clientY)
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return { x, y };
};

export default useMousePosition;
