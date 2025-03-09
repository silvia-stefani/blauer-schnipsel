'use client'

import { useParams } from 'next/navigation';
import usePageContent from '@/hooks/useProjectPage';

import styles from './page.module.scss';
import Head from '@/layout/Head/Head';
import Tratteggio from '@/components/Tratteggio/Tratteggio';
import i18n from '@/i18n';
import Tag from '@/components/Tag/Tag';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/Button/Button';
import useBreakpoints from '@/hooks/useBreakpoints';
import { useTranslation } from 'react-i18next';

function dividirArray(arr: string[]): [string[], string[]] {
    const array1 = arr.filter((_, index) => index % 2 === 0); // Elementos en posiciones 0, 2, 4, ...
    const array2 = arr.filter((_, index) => index % 2 !== 0); // Elementos en posiciones 1, 3, 5, ...
    return [array1, array2];
}

const ProjectPage = () => {

    const screenpart = window.innerHeight / 4;
    const { smallDevice } = useBreakpoints();
    const { t } = useTranslation();

    const params = useParams();
    const { slug } = params; // Obtenemos el slug y el idioma desde la URL

    if(!slug) return null;

    const {content: project, loading, error} = usePageContent(slug as string);
    const [isExpanded, setIsExpanded] = useState(false);
    const [height, setHeight] = useState(screenpart);

    const headRef = useRef<HTMLDivElement>(null);
 
    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    useEffect(() => {
        if(headRef.current) {
            const he = headRef.current.getBoundingClientRect().height;
            const hc = isExpanded ? screenpart : (window.innerHeight - he);
            setHeight(hc);
        }
    }, [isExpanded, headRef.current]);
    
    if (loading) return null;
    if (error) return <p>Proyecto no encontrado.</p>;
    if (!project) return null;
    
    const galleryDivided = dividirArray(project.gallery);

    return (
        <div className={`${styles.project} ${isExpanded ? styles.isExpanded : ''}`}>

            <div className={styles.container} style={{top: height}}>
                <div className={styles.info}>

                    <div ref={headRef} className={styles.head}>
                        <Head title={project.title[i18n.language]}>
                            {smallDevice && <Button label={isExpanded ? t("readLess") : t("readMore")} onPress={handleExpand} />}
                        </Head>
                    </div>
                    
                    <div className={styles.tags}>
                        {project.tags && project.tags.map((cat) => {
                            return <Tag key={cat.id} id={String(cat.id)} label={cat.name[i18n.language]} style={'shade'} />

                        })}
                    </div>
                    <Tratteggio direction='horizontal' />
                    <div className={styles.data}>
                        <div className={styles.location}>
                            {project.location}
                        </div>
                        <div className={styles.description}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta laboriosam non quidem quos tenetur culpa impedit enim, amet quam ducimus neque provident, nostrum voluptatum fugiat incidunt. Distinctio ratione quam ducimus!
                        </div>
                    </div>
                </div>
            </div>
            <span className={styles.tratteggio}><Tratteggio direction='vertical' /></span>
            <div className={styles.gallery}>

                {galleryDivided && galleryDivided.map((col, i) => {
                    return <div className={styles.column} key={`col${i}`}>
                        {col.map((image, i) => {
                            if(!image) return;
                            return (
                                <img key={`image${i}`} src={image} alt="" />
                            )
                        })}
                    </div>
                })}
                </div>

        </div>
    );
};

export default ProjectPage;
