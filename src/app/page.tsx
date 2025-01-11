'use client'

import { Fragment, useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';
import { createLetterArray } from '@/utils/createLetterArray';
import useMousePosition from '@/hooks/useMousePosition';
import PromoStick from '@/components/PromoStick/PromoStick';
import Schnipsel from '@/components/Schnipsel/Schnipsel';
import { useTranslation } from 'react-i18next';

interface Position {
  dx: number;
  dy: number;
  x: number;
  y: number;
}

export default function home() {

  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const [startGame, setStartGame] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStartGame(true)
    }, 1000);
  }, []);

  return (
    <Fragment>

      {/* <span className={styles.cursor} style={{left: x, top: y}}></span> */}

      <main className={styles.home}>

        <section ref={containerRef} className={`${styles.container} ${startGame ? styles.start : ''}`}>
          {startGame && Array.from({ length: 10 }).map((_, i) => {
            return <Schnipsel key={i} containerRef={containerRef} />
          })}
          <h2>{t("home.introduction")}</h2>
        </section>

        <aside className={styles.sidebar}>
          
        </aside>

      </main>
    </Fragment>
  );
}
