import * as React from 'react';
import styles from './ServiceCard.module.scss';
import { useArchive } from '@/contexts/ArchiveContext';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
import useBreakpoints from '@/hooks/useBreakpoints';

interface IServiceCardProps {
    id: string;
    title: string;
    text: string;
    tag: number;
    image: string;
}

const ServiceCard: React.FunctionComponent<IServiceCardProps> = ({
    id,
    title,
    text,
    tag,
    image,
}) => {
  
  const { largeDevice } = useBreakpoints();
  const { switchCategory } = useArchive();
  const { t } = useTranslation();

  const handleClick = () => {
    switchCategory(tag)
  }

  return (
    <div className={styles.ServiceCard} id={id} onClick={handleClick}>
        {!largeDevice && <div className={styles.image}><img src={image} alt={title} /></div>}
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
