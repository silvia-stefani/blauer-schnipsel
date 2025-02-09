'use client'

import styles from './page.module.scss';
import Head from '@/layout/Head/Head';
import Grid from '@/layout/Grid/Grid';
import usePageContent from '@/hooks/usePageContent';
import { useTranslation } from 'react-i18next';
import { getImageUrl } from '@/utils/getImageUrl';

export default function about() {

    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const { content, loading, error } = usePageContent(`about-${currentLocale}`, currentLocale);

    if(!content) return;
    const about = content.acf;
    
    if (loading) return null;
    if (error) return <p>{error}</p>;

    return <main className={styles.about}>

        {/* <Head
            title={about[`title_${currentLocale}`]}
            subtitle={about[`subtitle_${currentLocale}`]}
        /> */}

        <Grid cols={4}>
            <div className={styles.column}>
                <div className={styles.container}>
                    <div className={styles.title}>
                        <h4>Conosci la Crew</h4>
                    </div>
                    <div className={styles.member}>
                        <div className={styles.image}>
                            <img src={getImageUrl("http://blauerschnipsel.local/wp-content/uploads/2025/02/adele.jpg")} alt="" />
                        </div>
                        <div className={styles.name}>Adele</div>
                        <div className={styles.role}>Eco-social designer, upcycler, maniaca del cucito ®</div>
                    </div>
                    <div className={styles.member}>
                        <div className={styles.image}>
                        <img src={getImageUrl("http://blauerschnipsel.local/wp-content/uploads/2025/02/andrea.jpg")} alt="" />
                        </div>
                        <div className={styles.name}>Andrea</div>
                        <div className={styles.role}>Eco-social designer, upcycler, maniaca del cucito ®</div>
                    </div>
                    <div className={styles.member}>
                        <div className={styles.image}>
                        <img src={getImageUrl("http://blauerschnipsel.local/wp-content/uploads/2025/02/rocco.jpg")} alt="" />
                        </div>
                        <div className={styles.name}>Rocco</div>
                        <div className={styles.role}>Eco-social designer, upcycler, maniaca del cucito ®</div>
                    </div>
                </div>
            </div>

            <div className={styles.column}>
                <div className={styles.container}>
                    <div className={styles.title}><h4>Il nostro lavoro</h4></div>
                    <div className={styles.block}>
                        <div className={styles.title}>Presentazioni</div>
                        <div className={styles.text}>
                            Blauer Schnipsel è un progetto che lavora con il riuso creativo, la grafica generativa all’interno di laboratori collaborativi. Ha collaborato con...
                            È composto da tre componenti, che nella loro unione sono più della somma delle parti.
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.column}>
                <div className={styles.container}>
                    <div className={styles.title}><h4>Workshop & Eventi</h4></div>
                    <div className={styles.block}>
                        <div className={styles.title}>Progetti</div>
                        <div className={styles.text}>
                            Blauer Schnipsel è un progetto che lavora con il riuso creativo, la grafica generativa all’interno di laboratori collaborativi. Ha collaborato con...
                            È composto da tre componenti, che nella loro unione sono più della somma delle parti.
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.column}>
                <div className={styles.container}>
                    <div className={styles.title}><h4>Contatti</h4></div>
                    <div className={styles.block}>
                        <div className={styles.title}>Progetti</div>
                        <div className={styles.text}>
                            Blauer Schnipsel è un progetto che lavora con il riuso creativo, la grafica generativa all’interno di laboratori collaborativi. Ha collaborato con...
                            È composto da tre componenti, che nella loro unione sono più della somma delle parti.
                        </div>
                    </div>
                </div>
            </div>

        </Grid>

    </main>
}