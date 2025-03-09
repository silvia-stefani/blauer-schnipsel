import * as React from 'react';
import styles from './Grid.module.scss';
import Tratteggio from '@/components/Tratteggio/Tratteggio';
import { Fragment } from 'react';
import useBreakpoints from '@/hooks/useBreakpoints';

interface IGridProps {
    cols: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
    };
    children: React.ReactNode[];
}

const Grid: React.FunctionComponent<IGridProps> = ({ cols, children }) => {
    const { xsDevice, smallDevice, mediumDevice } = useBreakpoints();

    // Ajustar dinámicamente las columnas según el breakpoint
    let responsiveCols = cols.lg;
    if (cols.lg > 1) {
        if (xsDevice) responsiveCols = cols.xs; // Mobile (xs, sm)
        else if (smallDevice) responsiveCols = cols.sm; // Tablet (md)
        else if (mediumDevice) responsiveCols = cols.md; // Tablet (md)
    }

    const flatChildren = children.flat();
    const totalElements = flatChildren.length;
    const autoRows = Math.ceil(totalElements / responsiveCols);

    const rows = Array.from({ length: autoRows }, (_, rowIndex) => {
        return flatChildren.slice(rowIndex * responsiveCols, (rowIndex + 1) * responsiveCols);
    });

    return (
        <div className={styles.Grid}>
            {rows.map((row, rowIndex) => (
                <Fragment key={rowIndex}>
                    {rowIndex > 0 && <Tratteggio direction="horizontal" />}
                    <div className={styles.row} style={{ gridTemplateColumns: `repeat(${responsiveCols}, 1fr)` }}>
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
