'use client'

import { Fragment, UIEventHandler, useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';
import { createLetterArray } from '@/utils/createLetterArray';
import useMousePosition from '@/hooks/useMousePosition';
import PromoStick from '@/components/PromoStick/PromoStick';

interface Position {
  dx: number;
  dy: number;
  x: number;
  y: number;
}

export default function home() {

  const lettersArray1 = createLetterArray("BLAUER");
  const lettersArray2 = createLetterArray("SCHNIPSEL");
  const {x, y} = useMousePosition()

  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<{ element: Element; velocity: { x: number; y: number; }; position: { x: number; y: number; }; }[]>([]);

  useEffect(() => {
    if((!containerRef.current) || (!lettersRef.current)) return;
    // Inicializamos la referencia de las letras con un objeto que mantiene su velocidad
    lettersRef.current = Array.from(containerRef.current.querySelectorAll(".letter")).map(
      (letter) => ({
        element: letter,
        velocity: { x: 0, y: 0 }, // Velocidad inicial
        position: { x: 0, y: 0 }, // Posición inicial relativa
      })
    );
  }, []);

  const handleMouseMove: UIEventHandler<HTMLElement> = (e) => {
    const container = containerRef.current;
    if(!container) return;
    const { left, top, } = container.getBoundingClientRect(); // Dimensiones del contenedor
    const mouseX = x - left;
    const mouseY = y - top;

    lettersRef.current.forEach((letterObj) => {
      const letter = letterObj.element as HTMLElement;
      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = letter;
      const letterX = offsetLeft + offsetWidth / 2; // Coordenada X del centro de la letra
      const letterY = offsetTop + offsetHeight / 2; // Coordenada Y del centro de la letra

      const distX = letterX - mouseX; // Distancia en X entre el ratón y la letra (inversa para empujar correctamente)
      const distY = letterY - mouseY; // Distancia en Y entre el ratón y la letra (inversa para empujar correctamente)
      const distance = Math.sqrt(distX * distX + distY * distY); // Distancia euclidiana entre el ratón y la letra

      const maxDistance = 50; // Aumentamos el área de influencia del ratón
      if (distance < maxDistance) {
        // Invertimos la dirección para "repeler" las letras del cursor
        const repelFactor = (maxDistance - distance) / maxDistance; // Cuanto más cerca, mayor la repulsión
        const forceDirectionX = distX / distance; // Dirección en el eje X hacia donde empujar (inversa para alejarse)
        const forceDirectionY = distY / distance; // Dirección en el eje Y hacia donde empujar (inversa para alejarse)

        // Aplicamos la "fuerza" a ambos ejes para que la letra se aleje del cursor
        letterObj.velocity.x += forceDirectionX * repelFactor * 10; // Ajusta el multiplicador para más o menos fuerza
        letterObj.velocity.y += forceDirectionY * repelFactor * 10;
      }
    });
  };

  const updateLettersPosition = () => {
    const container = containerRef.current;
    if(!container) return;
    const { width, height } = container.getBoundingClientRect(); // Dimensiones del contenedor

    lettersRef.current.forEach((letterObj) => {
      const letter = letterObj.element as HTMLElement;
      const letterWidth = letter.offsetWidth;
      const letterHeight = letter.offsetHeight;

      // Actualizamos la posición de la letra según su velocidad
      letterObj.position.x += letterObj.velocity.x;
      letterObj.position.y += letterObj.velocity.y;

      // Aplicamos "fricción" para desacelerar el movimiento con el tiempo
      letterObj.velocity.x *= 0.9; // Mayor fricción para desacelerar
      letterObj.velocity.y *= 0.9;

      // Limitar la posición de la letra dentro del contenedor
      const maxX = width - letterWidth;
      const maxY = height - letterHeight;

      if (letterObj.position.x < 0) letterObj.position.x = 0;
      if (letterObj.position.x > maxX) letterObj.position.x = maxX;

      if (letterObj.position.y < 0) letterObj.position.y = 0;
      if (letterObj.position.y > maxY) letterObj.position.y = maxY;

      // Actualizamos el estilo transform de la letra
      letter.style.transform = `translate(${letterObj.position.x}px, ${letterObj.position.y}px)`;
    });

    // Continuamos el ciclo de animación
    requestAnimationFrame(updateLettersPosition);
  };

  useEffect(() => {
    updateLettersPosition();
  }, []);

  return (
    <Fragment>

      <span className={styles.cursor} style={{left: x, top: y}}></span>

      <PromoStick />

      <main className={styles.home}>
        <div ref={containerRef} 
        className={styles.logo} 
        onMouseMove={handleMouseMove}
        >
          <div>
          {lettersArray1.map((l, i) => {
            return <span 
            key={l.id}
            className={"letter"}
            >
              {l.letter}
            </span>
          })}
          </div>
          <div>{lettersArray2.map((l, i) => {
            return <span 
            key={l.id}
            className={"letter"}
            >
              {l.letter}
            </span>
          })}</div>
        </div>
        <div className={styles.concept}>
          <div className={styles.block}>
            <h3>Il collettivo</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi error laboriosam iste accusantium tempore, consequuntur voluptatum reiciendis eaque. Deserunt, eligendi ut natus dolores itaque quaerat in iste dolor unde vel.</p>
          </div>
        </div>
      </main>
    </Fragment>
  );
}
