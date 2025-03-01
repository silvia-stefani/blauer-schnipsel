'use client'

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';
import Schnipsel from '@/components/Schnipsel/Schnipsel';
import { useTranslation } from 'react-i18next';
import usePageContent from '@/hooks/usePageContent';
import useMousePosition from '@/hooks/useMousePosition';

export default function interactive() {

  const { i18n } = useTranslation();
  const { x, y } = useMousePosition();
  const currentLocale = i18n.language;
  const { content, loading, error } = usePageContent(`home-${currentLocale}`);

  const containerRef = useRef<HTMLDivElement>(null);

  const cursors = [
    {
      id: "default",
      path: "M5.118 13.274c1.116-.975.915-1.566 1.41-1.998.114-.1.217-.15.426-.212l1.457-.379c.173-.042.324-.074.452-.096l.036-.031c-.277-.594-.322-1.092-.138-1.651l-.029-.034-1.957.506c-.61.156-.8.012-1.238-.49-1.114-1.275-3.075-1.352-4.411-.184C-.204 9.867-.38 11.82.729 13.09c1.104 1.264 3.06 1.346 4.39.184Zm-.803-.92c-.782.683-1.958.626-2.608-.12-.666-.76-.554-1.922.227-2.605.805-.703 1.965-.652 2.63.11.157.178.275.387.347.615.072.228.097.47.074.714a1.915 1.915 0 0 1-.21.702 2 2 0 0 1-.46.584Zm6.412 7.34c1.337-1.168 1.523-3.121.41-4.396-.41-.469-.549-.676-.348-1.18L16.452.228c-.984-.632-2.084.07-3.13 1.87L9.738 8.281c-.503.868-.517 1.467-.167 2.265l.241.516c.167.372.158.638-.11 1.27l-.527 1.276c-.085.204-.149.3-.262.398-.495.433-1.059.15-2.174 1.124-1.33 1.162-1.511 3.11-.412 4.369 1.11 1.269 3.069 1.357 4.4.195Zm.58-9.897c-.27.235-.684.23-.91-.03-.238-.27-.182-.677.086-.912.274-.24.684-.24.921.031.227.26.177.672-.098.911Zm7.618-1.284c1.956-.784 2.768-1.792 2.254-2.875l-6.975 1.817-1.394 3.377.059.068 6.056-2.387ZM9.92 18.769c-.781.683-1.947.637-2.613-.125-.65-.745-.544-1.912.237-2.595.806-.703 1.97-.646 2.62.098.666.762.562 1.918-.244 2.622Z",
    },
    {
      id: "move",
      path: "M9.625.875h.001a2.19 2.19 0 0 1 2.19 2.19v2.751c3.007.456 4.672.713 4.97.766.378.069.88.271 1.295.698.437.447.732 1.092.732 1.937V19.25a.875.875 0 0 1-.875.875H8.313a.875.875 0 0 1-.876-.875v-2.285c-2.704-2.956-4.279-4.694-4.701-5.192-.425-.5-.774-1.32-.302-2.093.432-.709 1.31-.932 2.183-.932 1.2 0 2.068.87 2.599 1.404l.01.01.122.123.095.096v-.662c0-1.478-.001-3.696-.004-6.654A2.187 2.187 0 0 1 9.625.875Zm7.438 14.875V9.217c0-.41-.131-.61-.234-.715a.712.712 0 0 0-.354-.197c-.289-.052-2.166-.341-5.665-.871a.875.875 0 0 1-.744-.865V3.064a.439.439 0 0 0-.439-.439h-.001a.438.438 0 0 0-.437.438 5902.68 5902.68 0 0 1 .003 8.321 91.348 91.348 0 0 1-.004.576l-.003.04a.878.878 0 0 1-.044.215 1.576 1.576 0 0 1-.125.24c-.102.11-.417.266-.704.316v.038c-.587 0-1.06-.282-1.399-.545a8.772 8.772 0 0 1-.818-.758l-.11-.11c-.621-.624-.996-.899-1.368-.899a1.98 1.98 0 0 0-.6.074c.014.02.031.043.053.069.395.465 1.93 2.16 4.628 5.109h8.364Z",
    },
  ]

  const [currentCursor, setCurrentCursor] = useState(cursors[0]);
  
  if(!content) return;
  const home = content.acf;
  
  if (loading) return null;
  if (error) return <p>{error}</p>;

  return (

      <main className={styles.interactive}>

        <div className={styles.cursor} style={{left: x, top: y}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 21">
                <path d={currentCursor.path} />
            </svg>
        </div>

        <section ref={containerRef} className={styles.container}>
          {Array.from({ length: 6 }).map((_, i) => {
              return <Schnipsel key={i} containerRef={containerRef} />
            })}
        </section>

        <a href='/'>
            <span className={styles.title}>What's Blauer Schnipsel?</span>
            <span className={styles.icon}>➔{/* ☞ */}</span>
        </a>

      </main>

  );
}
