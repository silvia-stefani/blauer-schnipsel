import * as React from 'react';
import { MouseEventHandler, RefObject, useEffect, useRef, useState } from 'react';
import styles from './Schnipsel.module.scss';
import { formine } from '@/models/formine';

interface ISchnipselProps {
  containerRef: RefObject<HTMLDivElement>;
}

const Schnipsel: React.FunctionComponent<ISchnipselProps> = ({ containerRef }) => {


  const elementRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (elementRef.current && !elementRef.current.contains(event.target)) {
      setActiveUI(false)
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const [formina, setFormina] = useState(formine[0]);
  const [activeUI, setActiveUI] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0); // Estado para la rotación
  const [scale, setScale] = useState(150); // Estado para la escala
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Posición inicial aleatoria dentro del contenedor
    const container = containerRef.current;
    if (container) {
      const { width, height } = container.getBoundingClientRect();
      const randomX = Math.random() * width;
      const randomY = Math.random() * height;
      setPosition({ x: randomX, y: randomY });
    }
  }, [containerRef]);

  const handleMouseDown: MouseEventHandler = (e) => {
    setIsDragging(true);
    setActiveUI(false)
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    console.log('fd');
    
    setIsDragging(false)
  };

  const handleMouseMove: MouseEventHandler = (e) => {
    if (isDragging) {
      setActiveUI(true)
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;

      setPosition((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));

      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseOver: MouseEventHandler = (e) => {
    const { top, right, width, height } = e.currentTarget.getBoundingClientRect();
    const margin = scale / 2;
    const scaleZone = (top <= margin) && (right >= (window.innerWidth - margin));
    console.log(scaleZone);
    
    if (scaleZone) {
      console.log('Escalar: Estás en la esquina superior derecha');
    }

  }

  const handleScale: React.WheelEventHandler = (e) => {
    // Cambiar el tamaño con la rueda del ratón
    e.preventDefault();
    const scaleChange = e.deltaY < 0 ? 10 : -10; // Zoom in/out
    setScale((prev) => Math.max(50, prev + scaleChange)); // Escala mínima de 0.1
  };

  const handleRotation: MouseEventHandler = (e) => {
    if (e.shiftKey) {
      // Rotar cuando se mantiene presionada la tecla Shift
      const { movementX } = e;
      setRotation((prev) => prev + movementX * 0.5); // Ajustar sensibilidad
    }
  };

  const handleClick: React.UIEventHandler = (e) => {
    if(!activeUI && !isDragging) setFormina((prev) => formine[(formine.indexOf(prev) + 1) % formine.length])
  }
  
  return (
    <div
    ref={elementRef}
    className={`${styles.Schnipsel} ${activeUI ? styles.active : ''} ${isDragging ? styles.dragging : ''}`} 
    style={{
      width: scale,
      height: scale,
      left: `${position.x}px`,
      top: `${position.y}px`,
      transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      position: 'absolute',
    }}>
    {React.cloneElement(formina.svg, {
      onClick: handleClick,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseMove: handleMouseMove,
      onWheel: handleScale,
    })}
    </div>
  );
};

export default Schnipsel;
