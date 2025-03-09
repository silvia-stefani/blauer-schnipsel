'use client'

import styles from './page.module.scss';
import Grid from '@/layout/Grid/Grid';
import usePageContent from '@/hooks/usePageContent';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getContacts, getCurriculum, getCurriculumCategories, getTeam } from '@/services/api';

interface CurriculumCategory {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    taxonomy: string;
    parent: number;
    meta: any[];
    acf: {
        label: { [key: string]: string };
    };
    _links: {
        self: {
            href: string;
            targetHints: {
                allow: string[];
            };
        }[];
        collection: {
            href: string;
        }[];
        about: {
            href: string;
        }[];
        "wp:post_type": {
            href: string;
        }[];
        curies: {
            name: string;
            href: string;
            templated: boolean;
        }[];
    };
}

interface CurriculumI {
    id: number;
    date: string;
    date_gmt: string;
    guid: {
        rendered: string;
    };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: {
        rendered: string;
    };
    template: string;
    meta: {
        _acf_changed: boolean;
    };
    curriculum_category: number[];
    curriculum_year: number[];
    class_list: string[];
    acf: {
        text: { [key: string]: string };
        year: {
            id: number;
            name: string;
        };
    };
    _links: {
        self: {
            href: string;
            targetHints: {
                allow: string[];
            };
        }[];
        collection: {
            href: string;
        }[];
        about: {
            href: string;
        }[];
        "wp:attachment"?: {
            href: string;
        }[];
        "wp:term"?: {
            taxonomy: string;
            embeddable: boolean;
            href: string;
        }[];
        curies: {
            name: string;
            href: string;
            templated: boolean;
        }[];
    };
}

interface GroupedByYear {
    [key: string]: {
        id: number;
        name: string;
        projects: CurriculumI[];
    };
}


export default function About() {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const { content, loading, error } = usePageContent(`about`);

    const [team, setTeam] = useState<{
        id: number;
        acf: {
            name: string;
            photo: string;
            role: { [key: string]: string };
        };
    }[] | []>([]);

    const [allCols, setAllCols] = useState<CurriculumCategory[]>([]);
    const [allCats, setAllCats] = useState<CurriculumCategory[]>([]);
    const [allProjects, setAllProjects] = useState<CurriculumI[]>([]);

    const [contacts, setContacts] = useState<{
        id: number;
        acf: {
            name: string;
            value: string;
            link: {
                url: string;
                type: 'link' | 'mail' | 'tel' | string;
            };
        };
    }[] | []>([]);

    // Estado para controlar qué bloque está abierto
    const [openBlock, setOpenBlock] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            const data = await getTeam();
            const contacts = await getContacts();
            const cols = await getCurriculumCategories();
            const projects = await getCurriculum();
            const parentCols = cols.filter((col: { parent: number }) => col.parent == 0);
            const childCols = cols.filter((col: { parent: number }) => col.parent !== 0);

            setAllCols(parentCols);
            setAllCats(childCols);
            setAllProjects(projects);

            setTeam(data);
            setContacts(contacts);
        }
        fetchData();
    }, []);

    if (!content) return;
    const about = content.acf as any;

    if (loading) return null;
    if (error) return <p>{error}</p>;

    // Función para manejar la apertura y cierre de los bloques
    const toggleBlock = (id: string) => {
        setOpenBlock(openBlock === id ? null : id); // Si el bloque ya está abierto, lo cerramos, si no lo abrimos
    };

    return (
        <main className={styles.about}>
            <Grid cols={{xs: 1, sm: 1, md: 4, lg: 4}}>
                <div id="contacts-col" className={styles.column} is={openBlock === "contacts-col" ? 'open' : 'closed'}>
                    <div className={styles.container}>
                        <div className={styles.head} onClick={() => toggleBlock('contacts-col')}>
                            <h4 className={styles.title}>{about.contacts_title[currentLocale]}</h4>
                        </div>
                        <div className={styles.block_container}>
                            <div className={styles.block}>
                                {contacts.map((c) => {
                                    let href;
                                    switch (c.acf.link.type) {
                                        case 'mail':
                                            href = `mailto:${c.acf.link.url}`;
                                            break;
                                        case 'tel':
                                            href = `tel:${c.acf.link.url}`;
                                            break;
                                        case 'link':
                                            href = c.acf.link.url;
                                            break;

                                        default:
                                            break;
                                    }
                                    return (
                                        <div key={c.id}>
                                            {c.acf.name && <span>{c.acf.name}: </span>}
                                            <a href={href} target="_blank">
                                                {c.acf.value}
                                            </a>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={styles.block}>
                                {team.map((t) => {
                                    return (
                                        <div className={styles.member} key={t.id}>
                                            <div className={styles.image}>
                                                <img src={t.acf.photo} alt="" />
                                            </div>
                                            <div className={styles.name}>{t.acf.name}</div>
                                            <div className={styles.role}>
                                                {t.acf.role[`role_${currentLocale}`]}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {allCols.map((col) => {
                    const cats = allCats.filter((c) => c.parent === col.id);
                    return (
                        <div key={col.slug} className={styles.column} is={openBlock === col.slug ? 'open' : 'closed'}>
                            <div className={styles.container}>
                                <div className={styles.head}>
                                    <h4
                                        className={styles.title}
                                        onClick={() => toggleBlock(col.slug)} // Agregar el manejador de clic
                                    >
                                        {col.acf.label[currentLocale]}
                                    </h4>
                                </div>
                                <div className={styles.block_container}>
                                    {/* Solo mostrar el contenido si el bloque está abierto */}
                                    {cats.map((data) => {
                                            const projects = allProjects.filter((ap) =>
                                                ap.curriculum_category.some((id) => id === data.id)
                                            );

                                            const groupedByYear = projects.reduce<GroupedByYear>((acc, item) => {
                                                const yearTermId = item.curriculum_year[0];
                                                const yearName = item.acf.year.name;

                                                // Si el año no está en el acumulador, lo inicializamos
                                                if (!acc[yearTermId]) {
                                                    acc[yearTermId] = {
                                                        id: yearTermId,
                                                        name: yearName,
                                                        projects: [],
                                                    };
                                                }

                                                // Agregamos el proyecto al array correspondiente
                                                acc[yearTermId].projects.push(item);

                                                return acc;
                                            }, {});

                                            // Convertimos el objeto en un array de años con proyectos
                                            const result = Object.values(groupedByYear);
                                            if (result.length <= 0) return null;

                                            return (
                                                <div className={styles.group} key={data.id}>
                                                    <h5 className={styles.title}>{data.acf.label[currentLocale]}</h5>
                                                    <div className={styles.container}>
                                                        {result.map((b) => {
                                                            return (
                                                                <div key={b.id} className={styles.block}>
                                                                    <div className={styles.year}>{b.name}</div>
                                                                    {b.projects.map((p, i) => {
                                                                        return (
                                                                            <div key={p.id} className={styles.text}>
                                                                                {p.acf.text[currentLocale]}
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Grid>
        </main>
    );
}
