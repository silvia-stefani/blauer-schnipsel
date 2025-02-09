import * as React from 'react';
import styles from './ServiceCard.module.scss';

interface IServiceCardProps {
    id: string;
    title: string;
    text: string;
    image: string;
    link: string;
}

const ServiceCard: React.FunctionComponent<IServiceCardProps> = ({
    id,
    title,
    text,
    image,
    link,
}) => {
  return (
    <div className={styles.ServiceCard} id={id}>
        <div className={styles.image}><img src={image} alt={title} /></div>
        <div className={styles.container}>
            <h6 className={styles.title}>{title}</h6>
            <div className={styles.text}>{text}</div>
        </div>
        <a className={styles.link} href={"/" + link}>Leggi di più</a>
    </div>
  )
};

export default ServiceCard;
