'use client'

import { Fragment, useEffect, useState } from 'react';
import styles from './page.module.scss';
import { useTranslation } from 'react-i18next';
import EventCard from '@/components/EventCard/EventCard';
import Tratteggio from '@/components/Tratteggio/Tratteggio';
import { getIntroTextGroup, getIntroTexts, getProjectEvents } from '@/services/api';
import AnimatedText, { group } from '@/components/AnimatedText/AnimatedText';
import { ProjectI, ProjectIResponse } from '@/hooks/useProjects';

export default function home() {

  const { i18n } = useTranslation();
  const [introTexts, setIntroTexts] = useState<group[] | []>([]);
  const [events, setEvents] = useState<ProjectIResponse[] | []>([]);

  useEffect(() => {
      async function fetchData() {
          const data = await getIntroTextGroup();
          const dynamictexts = await getIntroTexts();
          const events = await getProjectEvents();
          setEvents(events);
          
          let introtexts: any[] | [] = [];
          if(data) {
            introtexts = await Promise.all(
              data.map(async (d: any) => {
                // Obtén los textos dinámicos de forma asincrónica
                
                const dt = dynamictexts.filter((dt: any) => 
                  dt.acf.group.includes(d.id)
                );
                const reducedData = dt.map((item: any) => ({
                  ...item.acf.text
                }));
                
                // Retorna el objeto con los textos estáticos y dinámicos resueltos
                return {
                  static: d.acf.label,
                  dynamic: reducedData, // Aquí ya tendrás los datos resueltos
                };
              })
            );
          }
          
          setIntroTexts(introtexts);
      }
      fetchData();
  }, []);

  return (
    <Fragment>

      {/* <span className={styles.cursor} style={{left: x, top: y}}></span> */}

      <main className={styles.home}>

        <section className={styles.container}>
          
          <div className={styles.introduction}>
            {introTexts && introTexts.length > 0 && <AnimatedText data={introTexts.map((it) => {
              return {
                static: it.static[i18n.language as any],
                dynamic: it.dynamic.map((d) => d[i18n.language as any])
              }
            })} />}
          </div>

        </section>

        <Tratteggio  direction='vertical' />

        <aside className={styles.sidebar}>
          <div className={styles.events}>
            {events.map((e) => {
              return <EventCard
                key={e.id}
                title={e.acf.title[i18n.language]}
                date={`${e.acf.date.start} - ${e.acf.date.end}`}
                place={e.acf.location}
                image={e.acf.cover_image}
                canBook={e.acf.sign_up}
              />
            })}
          </div>
        </aside>

      </main>
    </Fragment>
  );
}
