'use client'
import * as React from 'react';
import styles from './EventCard.module.scss';
import { useEffect, useRef, useState } from 'react';
import Tratteggio from '../Tratteggio/Tratteggio';
import Button from '../Button/Button';

interface IEventCardProps {
    title: string;
    date: string;
    place: string;
    image: string;
    canBook?: boolean;
}

const EventCard: React.FunctionComponent<IEventCardProps> = ({
    title,
    date,
    place,
    image,
    canBook,
}) => {

    const marqueeRef = useRef<HTMLDivElement | null>(null);
    const [content, setContent] = useState<string[]>([]);


    /* useEffect(() => {
        const calculateContent = () => {
          if (marqueeRef.current) {
            const containerWidth = marqueeRef.current.offsetWidth;
            const wordWidth = marqueeRef.current.scrollWidth; // Ancho total del contenido del carrusel
            if (containerWidth > 0 && wordWidth > 0) {
              const repeatCount = Math.ceil(containerWidth / wordWidth) + 20; // Repetimos al menos una vez más para continuidad
              setContent(Array(repeatCount).fill('in corso'));
            }
          }
        };
    
        calculateContent();
    
        window.addEventListener('resize', calculateContent);
        return () => window.removeEventListener('resize', calculateContent);
      }, []);
 */
    return <div className={styles.EventCard} data-book={canBook}>
            <div className={styles.container}>
            {/* {canBook && (
            <div ref={marqueeRef} className={styles.marqueeWrapper}>
                <div className={styles.marquee}>
                {content.map((word, index) => (
                    <span key={index}>{word}</span>
                ))}
                </div>
            </div>
            )} */}
            <div className={styles.content}>
                { canBook && <div className={styles.tag}>in corso</div>}
                <div className={styles.head}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.info}>{date} · {place}</div>
                </div>
                <div className={styles.image}>
                    <img src={image} alt={title} />
                </div>
                <Button label='Scopri di più' type={canBook ? 'light' : 'primary'} url='' />
            </div>
        </div>
        <Tratteggio direction='horizontal' />
    </div>;
};

export default EventCard;
