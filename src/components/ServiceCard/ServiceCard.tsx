import * as React from 'react';
import styles from './ServiceCard.module.scss';
import useProjects from '@/hooks/useProjects';
import { useRouter } from 'next/navigation';
import { useArchive } from '@/contexts/ArchiveContext';

interface IServiceCardProps {
    id: string;
    title: string;
    text: string;
    tag: string;
    image: string;
    getImage: (img: string) => void;
}

const ServiceCard: React.FunctionComponent<IServiceCardProps> = ({
    id,
    title,
    text,
    tag,
    image,
    getImage,
}) => {
  
  const { switchCategory } = useArchive();
  const router = useRouter();
  
  const handleMouseOver = () => {
    getImage(image)
  }

  const handleMouseLeave = () => {
    getImage('')
  }

  const handleClick = () => {
    switchCategory(tag)
    router.push("/archive")
  }

  return (
    <a className={styles.ServiceCard} id={id} onClick={handleClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
        <h6 className={styles.title}>{title}</h6>
        <div className={styles.container}>
            <div className={styles.text}>{text}</div>
        </div>
        <div className={styles.link}>Leggi di più</div>
    </a>
  )
};

export default ServiceCard;
