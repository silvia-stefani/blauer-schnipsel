import React, { cloneElement, MouseEventHandler, ReactElement, RefObject, useEffect, useRef, useState } from 'react';
import styles from './Schnipsel.module.scss';
import { bs1, bs1broken } from '@/models/formine';
import useMousePosition from '@/hooks/useMousePosition';

interface ISchnipselProps {
  containerRef: RefObject<HTMLDivElement>;
}

interface svgElementI {svg: ReactElement, width: number, height: number};

const Schnipsel: React.FunctionComponent<ISchnipselProps> = ({containerRef}) => {

  const [pieces, setPieces] = useState<{ svgElement: svgElementI; x: number; y: number; }[]>([]);
  const [isBroken, setIsBroken] = useState(false);

  const handleSeparation = (el: Element) => {
    const { left, top, width, height } = el.getBoundingClientRect();
    if (!isBroken) {
      const randomPieces = bs1broken.map((path) => {
        // Generar desplazamiento aleatorio dentro de -50 y 50
        const offsetX = Math.random() * (-50) - 50; // [-50, 50]
        const offsetY = Math.random() * (-50) - 50; // [-50, 50]

        return {
          svgElement: path,
          x: (left + (width / 2)) + offsetX,
          y: (top + (height / 2)) + offsetY,
        };
      });
      setPieces(randomPieces);
      setIsBroken(true)
    }
  }

  if(!pieces) return;

  return (
    <>
      {!isBroken ?
        <SchnipselSVG svgElement={bs1} isBroken={isBroken} separate={handleSeparation} containerRef={containerRef} />
        : pieces.map((d, i) => <SchnipselSVG key={i} svgElement={d.svgElement} isBroken={isBroken} containerRef={containerRef} />)}
    </>
  );
};

export default Schnipsel;

interface ISchnipselSVGProps {
  svgElement: svgElementI;
  isBroken: boolean;
  separate?: (el: Element) => void;
  containerRef: RefObject<HTMLDivElement>;
}

const SchnipselSVG: React.FunctionComponent<ISchnipselSVGProps> = ({ svgElement, isBroken, separate, containerRef }) => {

  const [isDragging, setIsDragging] = useState(false);
  const [mouseMoved, setMouseMoved] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0, r: 0 });
  const { x, y } = useMousePosition();

  const svgRef = useRef<SVGSVGElement | null>(null);
  const [sharpPoints, setSharpPoints] = useState<{ x: number; y: number }[]>([]);
  const [hoveredSharpPoint, setHoveredSharpPoint] = useState<{ x: number; y: number } | null>(null);

  const handleSeparation: MouseEventHandler = (e) => {
    if(mouseMoved) {
      e.stopPropagation();
    } else {
      if(separate) separate(e.currentTarget)
    }
  }

  // Iniciar arrastre
  const handleMouseDown: MouseEventHandler = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setMouseMoved(false); // Reiniciar estado al presionar
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  // Iniciar rotación
  const handleRotationStart: MouseEventHandler = (e) => {
    e.preventDefault();  
    if (hoveredSharpPoint) {
      setIsRotating(true);
    } else {
      setIsDragging(true);
    }
    
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  // Mover y rotar
  const handleMouseMove = () => {
    
    // Verificar si el cursor está cerca de un punto puntiagudo
    const hoveredPoint = sharpPoints.find(point => {
      const distance = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);
      return distance < 10; // Radio de detección
    });

    setHoveredSharpPoint(hoveredPoint || null);

    if (hoveredPoint) {
      document.body.style.cursor = "grab"; // Cambia el cursor cuando está en una esquina
    } else {
      document.body.style.cursor = "default"; // Cursor normal
    }
    
    if (isDragging) {
      const deltaX = x - lastMousePos.x;
      const deltaY = y - lastMousePos.y;

      setPosition((prev) => ({
        ...prev,
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));

      if (deltaX > 5 || deltaY > 5) { // Detectar movimiento significativo
          setMouseMoved(true);
      }

      setLastMousePos({ x, y });
    }

    if (isRotating) {
      const deltaX = x - lastMousePos.x;
      setPosition((prev) => ({
        ...prev,
        r: prev.r + deltaX * 0.5, // Ajusta la sensibilidad aquí
      }));

      setLastMousePos({ x, y });
    }
  };

  // Finalizar interacción
  const handleMouseUp: MouseEventHandler = (e) => {
    setIsDragging(false);
    setIsRotating(false);
  };

  // Aplicar efecto de movimiento al detectar cambios en la posición del mouse
  useEffect(() => {
    if(isDragging) handleMouseMove();
  }, [x, y]);

  useEffect(() => {
    // Posición inicial aleatoria dentro del contenedor
    const container = containerRef.current;
    if (container) {
      const { width, height } = container.getBoundingClientRect();
      const randomX = Math.random() * (width - 100);
      const randomY = Math.random() * (height - 100);
      const randomR = Math.random() * 360;
      setPosition({ x: randomX, y: randomY, r: randomR });
    }
  }, [containerRef]);

  return (
    <div className={`${styles.Schnipsel} ${isBroken ? styles.broken : ''}`}
      style={{ left: position.x, top: position.y }}>
      <div 
        className={`${styles.svgElement} ${isDragging ? styles.dragging : ''}`} 
        onMouseDown={handleMouseDown} 
        onMouseUp={handleMouseUp} 
        onClick={handleSeparation} 
        style={{width: svgElement.width, height: svgElement.height}}
      >
        {cloneElement(svgElement.svg, {
          width: svgElement.width,
          height: svgElement.height,
          ref: svgRef,
          style: {
            transform: `rotate(${position.r}deg)`
          },
        })}

      </div>
    </div>
  );
};
