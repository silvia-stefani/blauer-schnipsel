import { useState, useEffect } from 'react';
import { getProjects, getCategory, getCategories, getProjectDetails } from '@/services/api';
import { useTranslation } from 'react-i18next';
import { useArchive } from '@/contexts/ArchiveContext';

// Este hook maneja la obtención de proyectos y categorías.

export interface ProjectIResponse {
    id: number;
    title: {
        rendered: string;
    };
    content: { rendered: string };
    link: string;
    lang: "it" | "en" | "de";
    image_gallery: string[] | [];
    acf: { // Esto es donde ACF guarda los campos personalizados
        date: string;
        location: string;
        cover_image: string;
        can_book: boolean;
        [key: string]: any,
    };
    project_tag: number[];
}

export interface ProjectI {
    id: number;
    link: string;
    lang: "it" | "en" | "de";
    category: ArchiveCategoryI[];
    title: string,
    date: string;
    location: string;
    image: string;
    can_book: boolean;
    gallery: string[] | [];
}

interface Link {
    href: string;
    targetHints?: {
        allow: string[];
    };
}

interface TaxonomyLink {
    href: string;
}

interface ProjectCategoryResponseI {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    taxonomy: string;
    meta: any[];
    acf: {[key: string]: string | number};
    _links: {
        self: Link[];
        collection: TaxonomyLink[];
        about: TaxonomyLink[];
        "wp:post_type": TaxonomyLink[];
        curies: {
            name: string;
            href: string;
            templated: boolean;
        }[];
    };
}


const useProjects = () => {

    const { i18n } = useTranslation();
    const lang = i18n.language;    
    
    const [projects, setProjects] = useState<ProjectI[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { currentCategory } = useArchive();


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Obtener los proyectos
                const projectsData = await getProjects(lang);

                // Obtener los detalles y categorías de cada proyecto
                const projectsWithCategory: ProjectI[] = await Promise.all(
                    projectsData.map(async (project: ProjectIResponse) => {
                        /* const acfDetails: ProjectIResponse = await getProjectDetails(project.id, lang); */
                        const categoryLabels = await Promise.all(
                            project.project_tag.map(async (categoryId: number) => {
                                return getCategory(categoryId, lang);
                            })
                        );
                        const projectFinal: ProjectI = {
                            id: project.id,
                            category: categoryLabels || [],
                            title: project.acf[`title_${project.lang}`] as string,
                            date: project.acf.date,
                            location: project.acf.location,
                            link: project.link,
                            image: project.acf.cover_image,
                            can_book: project.acf.can_book,
                            lang: project.lang,
                            gallery: project.image_gallery,
                        }
                        return projectFinal;
                    })
                );

                // Filtrar proyectos por categoría
                const filteredProjects = currentCategory ? projectsWithCategory.filter(project =>
                    project.category.some(category => category.slug_common === currentCategory.slug_common)
                ) : projectsWithCategory;  // Si no hay categoría seleccionada, devuelve todos los proyectos

                setProjects(filteredProjects);  // Actualiza el estado con los proyectos y categorías
                
            } catch (error) {
                setError('Error loading projects');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [lang, currentCategory]);  // Se ejecuta una sola vez cuando el componente se monta
    
    return { projects, loading, error };
};

export default useProjects;
