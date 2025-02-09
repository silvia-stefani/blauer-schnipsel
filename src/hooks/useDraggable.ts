import { useState, useEffect } from "react";
import useMousePosition from "@/hooks/useMousePosition";

interface Position {
  x: number;
  y: number;
  r: number; // Rotación
}

export default function useDraggable(initialPosition: Position) {
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState(initialPosition);
  const { x, y } = useMousePosition();

  // Iniciar el arrastre
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  // Mover mientras se arrastra
  const handleMouseMove = () => {
    if (isDragging) {
      const deltaX = x - lastMousePos.x;
      const deltaY = y - lastMousePos.y;

      setPosition((prev) => ({
        ...prev,
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));

      setLastMousePos({ x, y });
    }
  };

  useEffect(() => {
    handleMouseMove();
  }, [x, y]);

  // Finalizar arrastre
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Rotación con input tipo `range`
  const handleRotation: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const currentValue = Number(e.currentTarget.value);
    setPosition((prev) => ({ ...prev, r: currentValue }));
  };

  return { position, handleMouseDown, handleMouseUp, handleRotation };
}
