'use client'
import * as React from 'react';
import styles from './EventCard.module.scss';
import Tratteggio from '../Tratteggio/Tratteggio';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
import Tag from '../Tag/Tag';

interface IEventCardProps {
    title: string;
    date: string;
    place: string;
    image: string;
    canBook?: boolean;
    slug: string;
}

const EventCard: React.FunctionComponent<IEventCardProps> = ({
    title,
    date,
    place,
    image,
    canBook,
    slug,
}) => {

    const { t } = useTranslation();

    return <div className={styles.EventCard} data-book={canBook}>
            <div className={styles.container}>
            <div className={styles.content}>
                { canBook && <Tag id='can-book' label='In corso' style='shade' />}
                <div className={styles.head}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.info}>{date} · {place}</div>
                </div>
                <div className={styles.image}>
                    <img src={image} alt={title} />
                </div>
                <Button label={t("exploreMore")} type={canBook ? 'light' : 'primary'} url={`/project/${slug}`} />
            </div>
        </div>
        <Tratteggio direction='horizontal' />
    </div>;
};

export default EventCard;
