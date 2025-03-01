'use client'

import { Fragment, useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';
import Schnipsel from '@/components/Schnipsel/Schnipsel';
import { useTranslation } from 'react-i18next';
import EventCard from '@/components/EventCard/EventCard';
import Tratteggio from '@/components/Tratteggio/Tratteggio';
import useProjects from '@/hooks/useProjects';
import ArchiveMini from '@/components/ArchiveMini/ArchiveMini';
import usePageContent from '@/hooks/usePageContent';
import AnimatedText from '@/components/AnimatedText/AnimatedText';
import Head from '@/layout/Head/Head';
import Grid from '@/layout/Grid/Grid';

export default function home() {

  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language;
  const { content, loading, error } = usePageContent(`home-${currentLocale}`);
  
  if (loading) return null;
  if (error) return <p>{error}</p>;

  return (
    <Fragment>

      {/* <span className={styles.cursor} style={{left: x, top: y}}></span> */}

      <main className={styles.home}>

        <section className={styles.container}>
          
          {/* <div ref={containerRef} className={`${styles.introduction} ${startGame ? styles.start : ''}`}>
            <h2>{home[`intro_${currentLocale}`]}</h2>
          </div> */}
          <div className={styles.introduction}>
            <AnimatedText />
          </div>

        </section>

        <Tratteggio  direction='vertical' />

        <aside className={styles.sidebar}>
          <div className={styles.events}>
            <EventCard
              title='Workshop Riciclo Creativo'
              date='18.21/05/25'
              place='Spazio Pantone, Narni'
              image='/img/image_workshop_1.jpg'
              canBook={true}
            />
            <EventCard
              title='Workshop Riciclo Creativo'
              date='18.21/05/25'
              place='Spazio Pantone, Narni'
              image='/img/image_workshop_1.jpg'
            />
            <EventCard
              title='Workshop Riciclo Creativo'
              date='18.21/05/25'
              place='Spazio Pantone, Narni'
              image='/img/image_workshop_1.jpg'
            />
          </div>
        </aside>

      </main>
    </Fragment>
  );
}
