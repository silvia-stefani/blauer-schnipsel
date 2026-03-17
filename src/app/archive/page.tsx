'use client'
import styles from './page.module.scss';
import Head from '@/layout/Head/Head';
import Grid from '@/layout/Grid/Grid';
import ArchiveMini from '@/components/ArchiveMini/ArchiveMini';
import useProjects from '@/hooks/useProjects';
import { useArchive } from '@/contexts/ArchiveContext';
import { useTranslation } from 'react-i18next';
import Tag from '@/components/Tag/Tag';
import usePageContent from '@/hooks/usePageContent';
import Loading from '@/components/Loading/Loading';

export default function archive() {
    
    const { i18n } = useTranslation();
    const currentLocale = i18n.language;
    const { content, loading: contentLoading } = usePageContent('archive');
    const { projects, loading, error } = useProjects();
    const { currentCategory, categories, switchCategory } = useArchive();
    
    if (error) {
      return <p>{error}</p>;
    }
    if (contentLoading || loading || !content) return <Loading />;
    const filteredProjects = currentCategory ? projects.filter(item => item.tags.some(tag => tag.id === currentCategory?.id)) : projects;

    return <main className={styles.archive}>

        { content && <div className={styles.head}>
            <Head 
                title={content.acf.title[i18n.language]}
                subtitle={content.acf.subtitle[i18n.language]}
            >
            <div className={styles.filters}>
                <button onClick={() => switchCategory()}>
                    <Tag id='all' label='Tutto' style={!currentCategory ? 'primary' : 'white'} />
                </button>
                {categories.map((cat) => {
                    const isCurrent = cat.id === currentCategory?.id;
                    return <button key={cat.id} onClick={() => switchCategory(cat.id)}>
                        <Tag id={String(cat.id)} label={cat.name[currentLocale]} style={isCurrent ? 'primary' : 'white'} />
                    </button>
                })}
            </div>
                
            </Head>
        </div> }

        <Grid cols={{xs: 1, sm: 1, md: 3, lg: 4}}>
            {filteredProjects && filteredProjects.map((ap) => {
                return <ArchiveMini key={ap.id} {...ap} />
            })}
        </Grid>

    </main>
}
