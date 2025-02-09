import { useState, useEffect, Fragment } from "react";
import styles from './AnimatedText.module.scss';
import { useTranslation } from "react-i18next";
import { IntroTextsInterface } from "@/interfaces/IntroTextsInterface.interface";

export default function AnimatedText() {

    const { t } = useTranslation();
    
    const bsIs: IntroTextsInterface = t("intro_bs.is", { returnObjects: true });
    const bsThat: IntroTextsInterface = t("intro_bs.that", { returnObjects: true });
    const bsThrough: IntroTextsInterface = t("intro_bs.through", { returnObjects: true });
    const bsFor: IntroTextsInterface = t("intro_bs.for", { returnObjects: true });
    const bsAim: IntroTextsInterface = t("intro_bs.aim", { returnObjects: true });

    const textGroups = [bsIs, bsThat, bsThrough, bsFor, bsAim];

    // Estados individuales para cada conjunto de textos
    const [indexes, setIndexes] = useState(textGroups.map(() => 0)); // Índice actual de cada grupo
    const [texts, setTexts] = useState(textGroups.map(() => "")); // Texto en animación
    const [deleting, setDeleting] = useState(textGroups.map(() => false)); // Estado de borrado para cada grupo
  
    useEffect(() => {
      const timeouts: NodeJS.Timeout[] = [];
  
      textGroups.forEach((group, i) => {
        const dynamicTexts = group.dynamic;
        const currentIndex = indexes[i] % dynamicTexts.length;
        const currentWord = dynamicTexts[currentIndex];
  
        if (!deleting[i]) {
          // Escritura letra por letra
          if (texts[i].length < currentWord.length) {
            timeouts[i] = setTimeout(() => {
              setTexts((prev) => {
                const newTexts = [...prev];
                newTexts[i] = currentWord.slice(0, prev[i].length + 1);
                return newTexts;
              });
            }, 30);
          } else {
            // Espera antes de borrar
            timeouts[i] = setTimeout(() => {
              setDeleting((prev) => {
                const newDeleting = [...prev];
                newDeleting[i] = true;
                return newDeleting;
              });
            }, 3000);
          }
        } else {
          // Borrado letra por letra
          if (texts[i].length > 0) {
            timeouts[i] = setTimeout(() => {
              setTexts((prev) => {
                const newTexts = [...prev];
                newTexts[i] = prev[i].slice(0, -1);
                return newTexts;
              });
            }, 30);
          } else {
            // Pasar a la siguiente palabra y resetear el estado de borrado
            setDeleting((prev) => {
              const newDeleting = [...prev];
              newDeleting[i] = false;
              return newDeleting;
            });
  
            setIndexes((prev) => {
              const newIndexes = [...prev];
              newIndexes[i] = (prev[i] + 1) % dynamicTexts.length;
              return newIndexes;
            });
          }
        }
      });
  
      return () => timeouts.forEach((t) => clearTimeout(t));
    }, [texts, deleting, indexes]);

    return (
        <h2 className={styles.AnimatedText}>

        {textGroups.map((group, i) => (
            <Fragment key={i}>
            <span className={styles.static}>{group.static}</span>
            <span className={styles.dynamic}>{texts[i]}</span>
            </Fragment>
        ))}

        </h2>
    );
}
