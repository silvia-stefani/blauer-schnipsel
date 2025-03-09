'use client'

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Header.module.scss';
import Link from 'next/link';
import useBreakpoints from '@/hooks/useBreakpoints';
import Tratteggio from '../Tratteggio/Tratteggio';
import { useTratteggio } from '@/contexts/TratteggioContext';
import { bs1 } from '@/models/formine';
import { getMenu } from '@/services/api';
import { MenuItemsI } from '@/interfaces/MenuItems.interface';

interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = () => {

    const { mediumDevice } = useBreakpoints();
    const { currentTratteggio, swipeTratteggio } = useTratteggio();
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const supportedLanguages = i18n.options.supportedLngs || [];

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng); // Cambia el idioma
    };
    
    const [open, setopen] = useState(false);

    const handleToggleMenu = () => {
        setopen(!open)
    }

    const Menu = <path fill='currentColor' d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>;
    const Close = <path fill='currentColor' d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>;
    const Hammer = <svg width="28" height="28" viewBox="0 0 55 51" xmlns="http://www.w3.org/2000/svg">
    <path d="M53.2846 22.4998L37.4737 6.58105C33.251 2.36682 27.5289 0 21.5631 0C15.5973 0 9.87522 2.36682 5.65256 6.58105L5.63146 6.60214L2.40412 9.9373C2.0698 10.2966 1.88967 10.7726 1.9024 11.2632C1.91513 11.7538 2.11971 12.2199 2.47221 12.5613C2.82472 12.9028 3.29705 13.0924 3.7878 13.0896C4.27856 13.0867 4.74863 12.8915 5.09709 12.5459L8.31506 9.22246C9.60972 7.92806 11.0871 6.83045 12.7002 5.96464L23.5987 16.8748L1.09865 39.3748C0.750342 39.723 0.474042 40.1365 0.285534 40.5915C0.097025 41.0465 0 41.5342 0 42.0268C0 42.5193 0.097025 43.007 0.285534 43.462C0.474042 43.917 0.750342 44.3305 1.09865 44.6787L5.94787 49.5279C6.2961 49.8762 6.70954 50.1525 7.16456 50.341C7.61959 50.5296 8.1073 50.6266 8.59982 50.6266C9.09235 50.6266 9.58006 50.5296 10.0351 50.341C10.4901 50.1525 10.9035 49.8762 11.2518 49.5279L33.7518 27.0279L41.2518 34.5279C41.6 34.8762 42.0134 35.1525 42.4685 35.341C42.9235 35.5296 43.4112 35.6266 43.9037 35.6266C44.3963 35.6266 44.884 35.5296 45.339 35.341C45.794 35.1525 46.2075 34.8762 46.5557 34.5279L53.2799 27.8037C53.6285 27.4558 53.9052 27.0426 54.0941 26.5877C54.283 26.1329 54.3805 25.6453 54.3809 25.1527C54.3813 24.6602 54.2847 24.1724 54.0966 23.7172C53.9085 23.262 53.6326 22.8483 53.2846 22.4998ZM32.4252 23.0459L27.1893 28.2818L22.3401 23.4373L27.5783 18.199C27.7527 18.0249 27.891 17.8181 27.9853 17.5905C28.0797 17.3628 28.1283 17.1189 28.1283 16.8725C28.1283 16.6261 28.0797 16.3821 27.9853 16.1544C27.891 15.9268 27.7527 15.72 27.5783 15.5459L16.483 4.45293C19.6886 3.5501 23.0769 3.51738 26.2994 4.35811C29.5218 5.19884 32.4622 6.88269 34.8182 9.23652L45.1822 19.6686L38.4393 26.4045L35.0783 23.0436C34.9042 22.8692 34.6974 22.7309 34.4698 22.6366C34.2422 22.5422 33.9982 22.4936 33.7518 22.4936C33.5054 22.4936 33.2614 22.5422 33.0338 22.6366C32.8061 22.7309 32.5993 22.8692 32.4252 23.0436V23.0459ZM43.9096 31.8725L41.0971 29.06L47.8143 22.324L50.6268 25.1365L43.9096 31.8725Z" fill="currentColor"/>
    </svg>

    const [menuItems, setMenuItems] = useState<MenuItemsI[] | []>([]);
    const [currentURL, setCurrentURL] = useState('');
  
    useEffect(() => {
        if(window.location.pathname) setCurrentURL(window.location.pathname);
    }, []);

    useEffect(() => {
        async function fetchMenuItems() {
            const mi = await getMenu();            
            setMenuItems(mi);
        }
        fetchMenuItems();
    }, [currentLanguage]);

    const handleSwitchRoute = (id: string) => {
        setCurrentURL(id);
        setopen(false);
    }

    const Navbar = <nav className={styles.navbar}>
        <ul className={styles.list}>
            {menuItems.length > 0 && menuItems.map((mi, i) => {
                const current = `/${mi.url}` === currentURL;
                return <li className={`${styles.item} ${current ? styles.current : ''}`} key={`menu${String(i)}`}>
                    <Link className={styles.link} onClick={() => handleSwitchRoute(`/${mi.url}`)} href={`/${mi.url}`}>{mi.title[currentLanguage]}</Link>
                </li>
                })}
        </ul>
    </nav>

    const MenuMobile = <div className={styles.MenuMobile}>
        <button className={styles.close} onClick={() => setopen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
                <path d="M4.5 18 3 16.5l6-6-6-6L4.5 3l6 6 6-6L18 4.5l-6 6 6 6-1.5 1.5-6-6-6 6Z" fill='currentColor'/>
            </svg>
        </button>
        {Navbar}
    </div>
    
    return <header className={`${styles.Header}`}>

        <div className={`${styles.menu} ${open ? styles.open : ''}`}>

            <a href="/" className={styles.logo}>Blauer Schnipsel</a>
            
            {!mediumDevice && Navbar}

            <div className={styles.features}>
                {!mediumDevice && <ul className={styles.list}>
                    {supportedLanguages.map((lang) => {
                        const isCurrent = lang === currentLanguage;
                        if(lang === "cimode") return;
                        return <li key={`lang-${lang}`} className={`${styles.language} ${isCurrent ? styles.current : ''}`}><button onClick={() => changeLanguage(lang)}>{lang}</button></li>;
                    })}
                </ul>}
                <button className={styles.swipeTratteggio} onClick={swipeTratteggio}>
                    <svg viewBox={`0 0 ${currentTratteggio.viewbox.w} ${currentTratteggio.viewbox.h}`}>
                        <path d={currentTratteggio.path} />
                    </svg>
                </button>
                {/* <a className={styles.swipeTratteggio} href='/interactive' target='_blank'>
                    {bs1.svg}
                </a> */}
            </div>

            {mediumDevice && <div className={styles.nav_container}>
                <div className={styles.toggle} onClick={handleToggleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
                        <path d="M1 17v-2.167h19V17H1Zm0-5.417V9.417h19v2.166H1Zm0-5.416V4h19v2.167H1Z" fill='currentColor'/>
                    </svg>
                </div>
            </div>}
            
        </div>

        {(mediumDevice && open) && MenuMobile}
        
        <Tratteggio direction='horizontal' />
    </header>;
    };

export default Header;
