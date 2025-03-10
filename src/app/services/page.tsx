'use client'

import Tratteggio from '@/components/Tratteggio/Tratteggio';
import styles from './page.module.scss';
import Head from '@/layout/Head/Head';
import usePageContent from '@/hooks/usePageContent';
import { useTranslation } from 'react-i18next';
import ServiceCard from '@/components/ServiceCard/ServiceCard';
import { Fragment, useEffect, useState } from 'react';
import { getServices } from '@/services/api';
import useMousePosition from '@/hooks/useMousePosition';
import { PageI } from '@/interfaces/PageI.interface';
import useBreakpoints from '@/hooks/useBreakpoints';

interface ServicesPageI extends PageI {
    link: {
        text: {[key: string]: string},
        url: string,
    }
}

export default function services() {

    const { i18n } = useTranslation();
    const currentLocale = i18n.language;
    const { content, loading, error } = usePageContent('services');
    const { x, y } = useMousePosition();
    const { largeDevice } = useBreakpoints();

    const [currentImage, setCurrentImage] = useState('');
    const [showImage, setShowImage] = useState(false);

    const [services, setServices] = useState<{
        id: number;
        acf: {
            image: string;
            title: {[key: string]: string};
            description: {[key: string]: string};
            tag: number;
        };
    }[] | []>([]);
    
    useEffect(() => {
        async function fetchServices() {
            const ss = await getServices();
            setServices(ss);
        }
        fetchServices();
    }, []);

    const handleMouseOver = (image: string) => {
        if(largeDevice) {
            setShowImage(true);
            setCurrentImage(image);
        }
    }

    if(!content) return;
    const servicesPage = content.acf as ServicesPageI;
    
    if (loading) return null;
    if (error) return <p>{error}</p>;

    return <main className={styles.services}>

        <Head
            title={servicesPage.title[currentLocale]}
            subtitle={<Fragment>{servicesPage.subtitle[currentLocale]} <a target='_blank' href={`mailto:${servicesPage.link.url}`}>{servicesPage.link.text[currentLocale]}</a></Fragment>}
            direction='row'
        />

        { showImage && <div className={styles.currentImage} style={{left: x - 320, top: y - 85}}>
            <img src={currentImage} alt="" /> 
        </div> }

        <div onMouseLeave={() => setShowImage(false)}>
            {services.map((service, i) => {
                const lastChild = (i + 1) === services.length;
                console.log(service);
                
                return (
                    <Fragment key={i}>
                        <div onMouseEnter={() => handleMouseOver(service.acf.image)}>
                            <ServiceCard
                                id={String(service.id)}
                                title={service.acf.title[`title_${currentLocale}`]}
                                text={service.acf.description[`description_${currentLocale}`]}
                                tag={service.acf.tag}
                                image={service.acf.image}
                            />
                        </div>
                    {!lastChild && <Tratteggio direction='horizontal' />}
                    </Fragment>
                )
            })}
        </div>

    </main>
}