import * as React from 'react';
import styles from './ArchiveMini.module.scss';
import { ProjectI } from '@/hooks/useProjects';
import Button from '../Button/Button';

interface IArchiveMiniProps extends ProjectI {};

const ArchiveMini: React.FunctionComponent<IArchiveMiniProps> = ({
    id,
    title,
    image,
    date,
    location,
    category,
    can_book,
}) => {
  return <a id={String(id)} className={styles.ArchiveMini} href={`/project/${id}`}>
    <div className={styles.image}>
        <img src={image} alt={title} />
    </div>
    <h6 className={styles.title}>
        {title}
    </h6>
    <div>
        {date}
        {location}
    </div>

    <div>
        {category.map((cat) => <div key={cat.id}>{cat.name}</div>)}
    </div>

    {can_book && <Button label='Segnati' type='primary' url='' />}
    
    </a>;
};

export default ArchiveMini;
