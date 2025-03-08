import * as React from 'react';
import styles from './ServiceCard.module.scss';
import { useArchive } from '@/contexts/ArchiveContext';
import Button from '../Button/Button';
import translations from '@/models/translations';
import { useTranslation } from 'react-i18next';

interface IServiceCardProps {
    id: string;
    title: string;
    text: string;
    tag: number;
}

const ServiceCard: React.FunctionComponent<IServiceCardProps> = ({
    id,
    title,
    text,
    tag,
}) => {
  
  const { i18n } = useTranslation();
  const currentLocale = i18n.language as "en" | "it" | "de";
  const { switchCategory } = useArchive();

  const handleClick = () => {
    switchCategory(tag)
  }

  return (
    <div className={styles.ServiceCard} id={id} onClick={handleClick}>
        <h6 className={styles.title}>{title}</h6>
        <div className={styles.container}>
            <div className={styles.text}>{text}</div>
        </div>
        <div className={styles.link}>
          <Button label={translations[currentLocale].readMore} type='primary' onPress={handleClick} url='archive' />
        </div>
    </div>
  )
};

export default ServiceCard;
