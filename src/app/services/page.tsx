'use client'

import Tratteggio from '@/components/Tratteggio/Tratteggio';
import styles from './page.module.scss';
import Head from '@/layout/Head/Head';
import Grid from '@/layout/Grid/Grid';
import usePageContent from '@/hooks/usePageContent';
import { useTranslation } from 'react-i18next';
import ServiceCard from '@/components/ServiceCard/ServiceCard';
import { useState } from 'react';

export default function services() {

    const { i18n } = useTranslation();
    const currentLocale = i18n.language;
    const { content, loading, error } = usePageContent('services');

    const [currentImage, setCurrentImage] = useState('');

    if(!content) return;
    const services = content.acf;
    
    if (loading) return null;
    if (error) return <p>{error}</p>;

    return <main className={styles.services}>

        {currentImage && <div className={styles.currentImage}>
            <img src={currentImage} alt="" />
        </div>}

        <Head
            title={services[`title_${currentLocale}`]}
            subtitle={services[`subtitle_${currentLocale}`]}
        />

        <div>
            <ServiceCard
                id='riuso_creativo'
                title='Riuso creativo'
                text='Cucire e riutilizzare è un atto collettivo e sovversivo: in questo laboratorio non solo potrai imparare  come cucire un pezzo in modo collaborativo, ma andremo anche a ritrovare una seconda vita ai materiali di scarto tessile. Scopri qui sotto alcune impressioni da laboratori passati che abbiamo fatto.'
                tag={"publications"}
                image='img/8166-116.jpg'
                getImage={setCurrentImage}
            />
            <Tratteggio direction='horizontal' />
            <ServiceCard
                id='guerrilla_print'
                title='Guerrilla print'
                text='Cucire e riutilizzare è un atto collettivo e sovversivo: in questo laboratorio non solo potrai imparare  come cucire un pezzo in modo collaborativo, ma andremo anche a ritrovare una seconda vita.'
                tag={"workshop"}
                image='img/image_workshop_1.jpg'
                getImage={setCurrentImage}
            />
            <Tratteggio direction='horizontal' />
            <ServiceCard
                id='ars_combinatoria'
                title='Ars Combinatoria'
                text='Laboratorio di grafica generativa per applicazioni decorative.'
                tag={"workshop"}
                image='img/8166-116.jpg'
                getImage={setCurrentImage}
            />
            <Tratteggio direction='horizontal' />
            <ServiceCard
                id='nave_pirata'
                title='Nave pirata'
                text='Laboratorio di costruzione collaborativa di una bandiera.'
                tag={"workshop"}
                image='img/8166-116.jpg'
                getImage={setCurrentImage}
            />
        </div>

    </main>
}