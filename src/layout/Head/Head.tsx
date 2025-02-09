import * as React from 'react';
import styles from './Head.module.scss';
import Tratteggio from '@/components/Tratteggio/Tratteggio';

interface IHeadProps {
    title: string;
    subtitle: string;
    children?: React.ReactNode;
}

const Head: React.FunctionComponent<IHeadProps> = ({
    title,
    subtitle,
    children,
}) => {
  return <div className={styles.Head}>

    <div className={styles.wrapper}>
        <div className={styles.content}>
            <h2>{title}</h2>
            <div className={styles.subtitle}>{subtitle}</div>
        </div>
        {children && children}
    </div>

    <Tratteggio direction='horizontal' />
    
  </div>;
};

export default Head;
