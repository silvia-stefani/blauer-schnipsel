'use client'
import * as React from 'react';

import styles from './Footer.module.scss';
import Link from 'next/link';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return <footer className={styles.Footer}>
    
    <div>
        <small>Blauer Schnipsel 2024</small>
    </div>

    
  </footer>;
};

export default Footer;
