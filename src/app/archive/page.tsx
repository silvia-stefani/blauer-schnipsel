'use client'
import styles from './page.module.scss';
import Head from '@/layout/Head/Head';
import Grid from '@/layout/Grid/Grid';
import ArchiveMini from '@/components/ArchiveMini/ArchiveMini';
import useProjects from '@/hooks/useProjects';
import { useArchive } from '@/contexts/ArchiveContext';
import { useTranslation } from 'react-i18next';

export default function archive() {
    
    const { i18n } = useTranslation();
    const currentLocale = i18n.language;
    const { projects, loading, error } = useProjects();
    const { currentCategory, categories, switchCategory } = useArchive();
    
    if (error) {
      return <p>{error}</p>;
    }
    const filteredProjects = currentCategory ? projects.filter(item => item.tags.some(tag => tag.id === currentCategory?.id)) : projects;

    return <main className={styles.archive}>

        <div className={styles.head}>
            <Head 
                title="Archivio Progetti"
                subtitle="Alcuni progetti che rispecchiano la nostra filosofia nelle sue molteplici sfaccettature."
            >
            <div className={styles.filters}>
                <div onClick={() => switchCategory()}
                    className={`${styles.cat} ${!currentCategory ? styles.current : ''}`}>
                        Tutto
                </div>
                {categories.map((cat) => {
                    const isCurrent = cat.id === currentCategory?.id;
                    return <div 
                    key={cat.id} 
                    id={String(cat.id)}
                    onClick={() => switchCategory(cat.id)}
                    className={`${styles.cat} ${isCurrent ? styles.current : ''}`}>
                        {cat.name[currentLocale]}
                    </div>
                })}
            </div>
                
            </Head>
        </div>

        {!loading && <Grid cols={4}>
            {filteredProjects && filteredProjects.map((ap) => {
                return <ArchiveMini key={ap.id} {...ap} />
            })}
        </Grid>}

    </main>
}