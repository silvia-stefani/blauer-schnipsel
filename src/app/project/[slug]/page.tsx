'use client'
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProjectIResponse } from '@/hooks/useProjects';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import usePageContent from '@/hooks/useProjectPage';

import styles from './page.module.scss';
import Head from '@/layout/Head/Head';
import Tratteggio from '@/components/Tratteggio/Tratteggio';
import Grid from '@/layout/Grid/Grid';
import { image } from '@nextui-org/theme';

function dividirArray(arr: string[]): [string[], string[]] {
    const array1 = arr.filter((_, index) => index % 2 === 0); // Elementos en posiciones 0, 2, 4, ...
    const array2 = arr.filter((_, index) => index % 2 !== 0); // Elementos en posiciones 1, 3, 5, ...
    return [array1, array2];
}

const ProjectPage = () => {

    const params = useParams();
    const { slug } = params; // Obtenemos el slug y el idioma desde la URL
    const {content: project, loading, error} = usePageContent(Number(slug))

    if (loading) return null;
    if (error) return <p>Proyecto no encontrado.</p>;
    if (!project) return null;
    
    const galleryDivided = dividirArray(project.gallery);

    return (
        <div className={styles.project}>

            <div className={styles.container}>
                <div className={styles.info}>
                    <Head title={project.title} />
                    <div className={styles.tags}>
                        {project.category.map((cat) => {
                            return <div key={cat.id} className={styles.tag}>
                                {cat.name}
                            </div>
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
            <Tratteggio direction='vertical' />
            <div className={styles.gallery}>

                {galleryDivided && galleryDivided.map((col, i) => {
                    return <div className={styles.column}>
                        {col.map((image) => {
                            if(!image) return;
                            return (
                                <img src={image} alt="" />
                            )
                        })}
                    </div>
                })}
                </div>

        </div>
    );
};

export default ProjectPage;
