'use client'

import * as React from 'react';
import styles from './Loading.module.scss';

const Loading: React.FunctionComponent = () => {
    return (
        <div className={styles.Loading} aria-label="Loading" role="status">
            <span className={styles.spinner} />
        </div>
    );
};

export default Loading;
