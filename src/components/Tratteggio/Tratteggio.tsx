'use client'

import * as React from 'react';
import styles from './Tratteggio.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useTratteggio } from '@/contexts/TratteggioContext';

interface ITratteggioProps {
    direction: 'horizontal' | 'vertical';
}

const Tratteggio: React.FunctionComponent<ITratteggioProps> = ({
    direction
}) => {

    const { currentTratteggio } = useTratteggio();
    const [containerSize, setContainerSize] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const svgSize = 10;
    const repetitions = Math.ceil(containerSize / svgSize);

    // Actualizar el tamaño del contenedor cuando cambie
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                setContainerSize(
                    direction === 'horizontal'
                        ? containerRef.current.offsetWidth
                        : containerRef.current.offsetHeight
                );
            }
        };

        // Llamamos a la función de actualización al montar el componente
        updateSize();

        // Agregar un listener para cambios en el tamaño
        window.addEventListener('resize', updateSize);

        // Limpiar el listener cuando el componente se desmonte
        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, [direction]);

    const svgElements = Array.from({ length: repetitions }).map((_, index) => {

        return (
            <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                width={svgSize}
                height={svgSize}
                viewBox={`0 0 ${currentTratteggio.viewbox.w} ${currentTratteggio.viewbox.h}`}
                style={{
                    transform: `rotate(${direction === "vertical" ? 0 : 90}deg)`,
                }}
            >
                <path d={currentTratteggio.path} />
            </svg>
        );
    });

    return <span className={styles.Tratteggio}
        id={currentTratteggio.id}
        ref={containerRef}
        style={{
            width: direction === 'horizontal' ? '100%' : 5,
            height: direction === 'vertical' ? '100%' : 5,
        }}
        >
        <div className={styles.wrapper} style={{
            flexDirection: direction === 'horizontal' ? 'row' : 'column',
            width: direction === 'horizontal' ? '100%' : svgSize,
            height: direction === 'vertical' ? '100%' : svgSize,
            overflow: 'hidden',
        }}>
            {svgElements}
        </div>
    </span>;
};

export default Tratteggio;
