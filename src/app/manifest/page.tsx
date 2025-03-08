'use client'
import { useTranslation } from 'react-i18next';

import styles from './page.module.scss';
import Tratteggio from '@/components/Tratteggio/Tratteggio';
import { getStatements } from '@/services/api';
import { useEffect, useState } from 'react';

export default function manifest() {
    
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;

    const [statements, setStatements] = useState<{
        id: number;
        acf: {
            text: {[key: string] : string}
        }
    }[] | []>([]);
    
    useEffect(() => {
        async function fetchStatements() {
            const ss = await getStatements();
            setStatements(ss);
        }
        fetchStatements();
    }, []);

    return <main className={styles.manifest}>

        <ol className={styles.list}>
        {statements.map((statement, i) => {
            const lastChild = (i + 1) === statements.length;
            return (
                <li key={i} className={styles.item}>
                    <span className={styles.text}>{statement.acf.text[`text_${currentLanguage}`]}</span>
                    {!lastChild && <Tratteggio direction='horizontal' />}
                </li>
            )
        })}
        </ol>

    </main>
}