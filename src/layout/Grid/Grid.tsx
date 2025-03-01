import * as React from 'react';
import styles from './Grid.module.scss';
import Tratteggio from '@/components/Tratteggio/Tratteggio';
import { Fragment } from 'react';

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

    // Agrupamos los elementos en filas
    const rows = Array.from({ length: autoRows }, (_, rowIndex) => {
        return children.slice(rowIndex * cols, (rowIndex + 1) * cols);
    });

    return (
        <div className={styles.Grid}>
            {rows.map((row, rowIndex) => (
                <Fragment key={rowIndex}>
                {/* Renderizamos la línea horizontal después de cada fila */}
                {rowIndex > 0 && <Tratteggio direction="horizontal" />}
                <div className={styles.row} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                    {row.map((child, colIndex) => (
                        <div key={colIndex} className={styles.item} style={{ flex: 1 }}>
                            {child}
                            {colIndex < row.length - 1 && <Tratteggio direction="vertical" />}
                        </div>
                    ))}
                </div>
                {rows.length === 1 && <Tratteggio direction="horizontal" />}
                </Fragment>
            ))}
        </div>
    );
};

export default Grid;
