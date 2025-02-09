'use client'
import styles from './page.module.scss';
import Head from '@/layout/Head/Head';
import Grid from '@/layout/Grid/Grid';
import ArchiveMini from '@/components/ArchiveMini/ArchiveMini';
import useProjects from '@/hooks/useProjects';
import { useTranslation } from 'react-i18next';
import usePageContent from '@/hooks/usePageContent';

export default function manifest() {
    
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const { content, loading, error } = usePageContent(`manifest-${currentLocale}`, currentLocale);

    if(!content) return;
    const manifest = content.acf;
    console.log(manifest);
    
    
    if (loading) return null;
    if (error) return <p>{error}</p>;

    return <main className={styles.manifest}>

    {manifest[`title_${currentLocale}`]}

    </main>
}