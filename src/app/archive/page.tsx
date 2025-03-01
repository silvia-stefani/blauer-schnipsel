'use client'
import styles from './page.module.scss';
import Head from '@/layout/Head/Head';
import Grid from '@/layout/Grid/Grid';
import ArchiveMini from '@/components/ArchiveMini/ArchiveMini';
import useProjects from '@/hooks/useProjects';
import { useArchive } from '@/contexts/ArchiveContext';

export default function archive() {
    
    const { projects, loading, error } = useProjects();
    const { currentCategory, categories, switchCategory } = useArchive();
    
    if (error) {
      return <p>{error}</p>;
    }

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
                    const isCurrent = cat.slug_common === currentCategory?.slug_common;
                    return <div 
                    key={cat.id} 
                    onClick={() => switchCategory(cat.slug_common)}
                    className={`${styles.cat} ${isCurrent ? styles.current : ''}`}>
                        {cat.name}
                    </div>
                })}
            </div>
                
            </Head>
        </div>

        {!loading && <Grid cols={4}>
            {projects.map((ap) => {
                return <ArchiveMini key={ap.id} {...ap} />
            })}
        </Grid>}

    </main>
}