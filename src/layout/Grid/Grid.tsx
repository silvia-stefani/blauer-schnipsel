import * as React from 'react';
import styles from './Grid.module.scss';
import Tratteggio from '@/components/Tratteggio/Tratteggio';

interface IGridProps {
    cols: number;
    children: React.ReactNode[];
}

const Grid: React.FunctionComponent<IGridProps> = ({
    cols,
    children,
}) => {

    // Calculamos automáticamente las filas si no se proporcionan
    const totalElements = children.length;
    const autoRows = Math.ceil(totalElements / cols);

    // Función para renderizar líneas verticales
    const renderVerticalLines = (index: number) => {
        if ((index + 1) % cols === 0) return null; // No renderizar al final de una fila
        return <Tratteggio direction="vertical" />;
    };

    // Función para renderizar líneas horizontales
    const renderHorizontalLines = (index: number) => {
        const isLastRow = Math.floor(index / cols) === autoRows - 1; // Última fila
        if (index >= totalElements - cols) return null; // No renderizar debajo de la última fila
        if (!isLastRow || (isLastRow && (index + 1) % cols !== 0)) {
        return <Tratteggio direction="horizontal" />;
        }
        return null;
    };

    return (
    <div className={styles.Grid} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {children.map((child, index) => (
            <div key={index} className={styles.item}>
                {child}
                {renderVerticalLines(index)}
                {renderHorizontalLines(index)}
            </div>
        ))}
    </div>
    );
};

export default Grid;
