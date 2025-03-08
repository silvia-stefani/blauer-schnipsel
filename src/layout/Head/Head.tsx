import * as React from 'react';
import styles from './Head.module.scss';
import Tratteggio from '@/components/Tratteggio/Tratteggio';

interface IHeadProps {
    title: string;
    subtitle?: string | React.ReactElement;
    children?: React.ReactNode;
    direction?: React.CSSProperties["flexDirection"];
}

const Head: React.FunctionComponent<IHeadProps> = ({
    title,
    subtitle,
    children,
    direction = "column",
}) => {
  return <div className={styles.Head}>

    <div className={`${styles.wrapper} ${styles[direction]}`}>
        <div className={styles.content}>
            <h2>{title}</h2>
            {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        </div>
        {children && children}
    </div>

    <Tratteggio direction='horizontal' />
    
  </div>;
};

export default Head;
