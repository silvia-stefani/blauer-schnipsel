'use client'
import { useTranslation } from 'react-i18next';
import usePageContent from '@/hooks/usePageContent';

import styles from './page.module.scss';
import Tratteggio from '@/components/Tratteggio/Tratteggio';

export default function manifest() {
    
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const { content, loading, error } = usePageContent(`manifest-${currentLocale}`, currentLocale);

    if(!content) return;
    const manifest = content.acf;
    
    const statements = [
        {
            id: "first",
            text: "Crediamo che lo scarto debba essere affrontato in maniera giocosa e sperimentale partendo dalle sue forme e combinazioni sorprendenti piuttosto che dal suo impatto negativo. I tessuti di upcycling che andiamo a co-generare attraverso i laboratori si contraddistinguono per la loro estetica. Questa non richiama direttamente lo scarto ma né diventa l’apoteosi: lo scarto non deve risultare come tale a prima vista ma come prodotto che cattura e affascina."
        },
        {
            id: "second",
            text: "Unisce saperi e discipline per creare pratiche sperimentali.Lavoriamo con il cucito me ne stravolgiamo le modalità. Unendo le sue tecniche a principi grafici-compositivi e contestualizzando gli spazi dove questo avviene riusciamo a raggiungere nuovi target evitando di ricadere nella sola sfera amatoriale."
        },
        {
            id: "third",
            text: "Accoglie le diversità e valorizza il know-how della comunità. I nostri laboratori sono sempre gratuiti e aperti a tutt*. Si adattano a pubblici intergenerazionali e multiculturali. Utilizziamo strumenti sviluppati ad hoc che ci permettono di semplificare tematiche anche complesse per renderle facilmente approcciabili. I nostri format accolgono diversi gradi di competenze tecniche: le persone neofite alle attività di cucito potranno sperimentare liberamente stimolate dai nostri strumenti, chi invece è già professionista potrà vedere valorizzate le sue competenze (spesso considerate un sapere di seconda categoria)."
        },
        {
            id: "fourth",
            text: "Interviene nello spazio (pubblico). Crediamo nel potere della bellezza di quello che ci circonda. Decorare gli spazi sia pubblici che privati significa renderli accoglienti, significativi. Farlo con opere realizzate dalle stesse persone che lo vivono partendo da un materiale che altrimenti sarebbe stato scartato né aggiunge un valore ulteriore."
        },
        {
            id: "fifth",
            text: "Diffusione e condividivisione. Strumenti, metodi, idee, tecniche. Non abbiamo segreti professionali. Il nostro unico segreto risiede nelle nostre personalità, uniche e irriproducibili :-)"
        }
    ]
    
    if (loading) return null;
    if (error) return <p>{error}</p>;

    return <main className={styles.manifest}>

        <ol className={styles.list}>
        {statements.map((statement, i) => {
            const lastChild = (i + 1) === statements.length;
            return (
                <li key={statement.id} className={styles.item}>
                    <span className={styles.text}>{statement.text}</span>
                    {!lastChild && <Tratteggio direction='horizontal' />}
                </li>
            )
        })}
        </ol>

    </main>
}