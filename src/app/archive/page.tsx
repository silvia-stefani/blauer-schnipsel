'use client'
import styles from './page.module.scss';
import Head from '@/layout/Head/Head';
import Grid from '@/layout/Grid/Grid';
import ArchiveMini from '@/components/ArchiveMini/ArchiveMini';
import useProjects from '@/hooks/useProjects';
import { useTranslation } from 'react-i18next';
import usePageContent from '@/hooks/usePageContent';

export default function archive() {
    
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;    
    const { projects, categories, currentCategory, switchCategory, loading, error } = useProjects(currentLocale);

    if (loading) {
      return <p>Loading...</p>;
    }
  
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
                    const isCurrent = cat.id === currentCategory?.id;
                    return <div 
                    key={cat.id} 
                    onClick={() => switchCategory(cat.id)}
                    className={`${styles.cat} ${isCurrent ? styles.current : ''}`}>
                        {cat.name}
                    </div>
                })}
            </div>
                
            </Head>
        </div>

        <Grid cols={4}>
            {projects.map((ap) => {
                return <ArchiveMini key={ap.id} {...ap} />
            })}
        </Grid>

    </main>
}