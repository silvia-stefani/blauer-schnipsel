'use client'

import Tratteggio from '@/components/Tratteggio/Tratteggio';
import styles from './page.module.scss';
import Head from '@/layout/Head/Head';
import Grid from '@/layout/Grid/Grid';
import usePageContent from '@/hooks/usePageContent';
import { useTranslation } from 'react-i18next';
import ServiceCard from '@/components/ServiceCard/ServiceCard';
import { Fragment, useEffect, useState } from 'react';
import { getServices } from '@/services/api';

export default function services() {

    const { i18n } = useTranslation();
    const currentLocale = i18n.language;
    const { content, loading, error } = usePageContent('services');

    const [currentImage, setCurrentImage] = useState('');

    const [services, setServices] = useState<{
        id: number;
        acf: {
            title: {[key: string] : string},
            description: {[key: string] : string}
        }
    }[] | []>([]);
    
    useEffect(() => {
        async function fetchServices() {
            const ss = await getServices();
            setServices(ss);
        }
        fetchServices();
    }, []);

    if(!content) return;
    const servicesPage = content.acf;
    
    if (loading) return null;
    if (error) return <p>{error}</p>;

    return <main className={styles.services}>

        {currentImage && <div className={styles.currentImage}>
            <img src={currentImage} alt="" />
        </div>}

        <Head
            title={servicesPage[`title_${currentLocale}`]}
            subtitle={servicesPage[`subtitle_${currentLocale}`]}
        />

        <div>
            {services.map((service, i) => {
                const lastChild = (i + 1) === services.length;
                return (
                    <Fragment key={i}>
                    <ServiceCard
                        id='riuso_creativo'
                        title={service.acf.title[`title_${currentLocale}`]}
                        text={service.acf.description[`description_${currentLocale}`]}
                        tag={"publications"}
                        image='img/8166-116.jpg'
                        getImage={setCurrentImage}
                    />
                    {!lastChild && <Tratteggio direction='horizontal' />}
                    </Fragment>
                )
            })}
        </div>

    </main>
}