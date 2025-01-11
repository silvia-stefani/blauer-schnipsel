import * as React from 'react';
import styles from './PromoStick.module.scss';
import { useState } from 'react';

interface IPromoStickProps {
}

const PromoStick: React.FunctionComponent<IPromoStickProps> = (props) => {

    const [isOpen, setIsOpen] = useState(true);

    const handleToggleOpen = () => {
        setIsOpen(false);
    }

    if(!isOpen) return;

    return <div className={styles.PromoStick}>
        <div className={styles.container}>
        <div className={styles.image}>
            <img src="/img/8166-116.jpg" alt="" />
        </div>
        <div className={styles.info}>
            <div className={styles.tag}>In corso</div>
            <h4>Mostra per il festival Identity in Motion (organizzato dall'associazione culturale "lasecondaluna")</h4>
            <div className={styles.data}>
            <div>07.09 al 14.09</div>
            <a href='https://www.google.es/maps/place/39055+Laives,+Bolzano,+Italia/@46.4214274,11.3256776,15z/data=!3m1!4b1!4m6!3m5!1s0x47829d37aa910597:0xa0709898bf22e60!8m2!3d46.4270631!4d11.3372058!16zL20vMGc5Z3c2?entry=ttu&g_ep=EgoyMDI0MDkwNC4wIKXMDSoASAFQAw%3D%3D' target='_blank'>Laives-Leifers (BZ)</a>
            </div>
        </div>
        <button onClick={handleToggleOpen}>x</button>
        </div>
    </div>;
};

export default PromoStick;
