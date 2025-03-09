import * as React from 'react';
import styles from './ArchiveMini.module.scss';
import { ProjectI } from '@/hooks/useProjects';
import Button from '../Button/Button';
import Tag from '../Tag/Tag';
import { useTranslation } from 'react-i18next';

interface IArchiveMiniProps extends ProjectI {};

const ArchiveMini: React.FunctionComponent<IArchiveMiniProps> = ({
    id,
    title,
    image,
    date,
    location,
    tags,
    can_book,
    slug,
}) => {

    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;
    
    return <a id={String(id)} className={styles.ArchiveMini} href={`/project/${slug}`}>
        <div className={styles.image}>
            <img src={image} alt={title[currentLanguage]} />
        </div>
        <h6 className={styles.title}>{title[currentLanguage]}</h6>
        {/* <div className={styles.info}>
            <span>{date.year.name}</span>
            <span>{location}</span>
        </div> */}

        <div className={styles.tags}>
            {tags.map((tag) => <Tag key={tag.id} id={String(tag.id)} label={tag.name[currentLanguage]} style='shade' />)}
        </div>

        {can_book && <div className={styles.signup}><Button label='Segnati' type='primary' url='' /></div>}
    
    </a>;
};

export default ArchiveMini;
