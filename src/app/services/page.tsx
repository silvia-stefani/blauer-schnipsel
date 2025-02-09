'use client'

import Tratteggio from '@/components/Tratteggio/Tratteggio';
import styles from './page.module.scss';
import Head from '@/layout/Head/Head';
import Grid from '@/layout/Grid/Grid';
import usePageContent from '@/hooks/usePageContent';
import { useTranslation } from 'react-i18next';
import ServiceCard from '@/components/ServiceCard/ServiceCard';

export default function services() {

    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const { content, loading, error } = usePageContent(`services-${currentLocale}`, currentLocale);

    if(!content) return;
    const services = content.acf;
    
    if (loading) return null;
    if (error) return <p>{error}</p>;

    return <main className={styles.services}>

        <Head
            title={services[`title_${currentLocale}`]}
            subtitle={services[`subtitle_${currentLocale}`]}
        />

        <Grid cols={4}>
            <ServiceCard
                id='riuso_creativo'
                title='Riuso creativo'
                text='Cucire e riutilizzare è un atto collettivo e sovversivo: in questo laboratorio non solo potrai imparare  come cucire un pezzo in modo collaborativo, ma andremo anche a ritrovare una seconda vita ai materiali di scarto tessile. Scopri qui sotto alcune impressioni da laboratori passati che abbiamo fatto.'
                link='riuso_creativo'
                image='img/8166-116.jpg'
            />
            <ServiceCard
                id='guerrilla_print'
                title='Guerrilla print'
                text='Cucire e riutilizzare è un atto collettivo e sovversivo: in questo laboratorio non solo potrai imparare  come cucire un pezzo in modo collaborativo, ma andremo anche a ritrovare una seconda vita.'
                link='guerrilla_print'
                image='img/8166-116.jpg'
            />
            <ServiceCard
                id='ars_combinatoria'
                title='Ars Combinatoria'
                text='Laboratorio di grafica generativa per applicazioni decorative.'
                link='ars_combinatoria'
                image='img/8166-116.jpg'
            />
            <ServiceCard
                id='nave_pirata'
                title='Nave pirata'
                text='Laboratorio di costruzione collaborativa di una bandiera.'
                link='nave_pirata'
                image='img/8166-116.jpg'
            />
        </Grid>

    </main>
}