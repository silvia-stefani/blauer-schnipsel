import * as React from 'react';
import styles from './ArchiveMini.module.scss';
import { ProjectI } from '@/hooks/useProjects';
import Button from '../Button/Button';
import i18n from '@/i18n';

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

    const currentLanguage = i18n.language;
    
    return <a id={String(id)} className={styles.ArchiveMini} href={`/project/${slug}`}>
        <div className={styles.image}>
            <img src={image} alt={title[currentLanguage]} />
        </div>
        <h6 className={styles.title}>{title[currentLanguage]}</h6>
        <div className={styles.info}>
            {date}
            {location}
        </div>

        <div className={styles.tags}>
            {tags.map((tag) => <div key={tag.id} className={styles.tag}>{tag.name[currentLanguage]}</div>)}
        </div>

        {can_book && <Button label='Segnati' type='primary' url='' />}
    
    </a>;
};

export default ArchiveMini;
