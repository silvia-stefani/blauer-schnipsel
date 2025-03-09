import * as React from 'react';
import styles from './ServiceCard.module.scss';
import { useArchive } from '@/contexts/ArchiveContext';
import Button from '../Button/Button';
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
  
  const { switchCategory } = useArchive();
  const { t } = useTranslation();  

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
          <Button label={t("readMore")} type='primary' onPress={handleClick} url='archive' />
        </div>
    </div>
  )
};

export default ServiceCard;
