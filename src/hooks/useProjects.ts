import { useState, useEffect } from 'react';
import { getProjects, getProjectDetails, getCategory, getCategories } from '@/services/api';

// Este hook maneja la obtención de proyectos y categorías.

interface ProjectIResponse {
    id: number;
    content: { rendered: string };
    link: string;
    acf: { // Esto es donde ACF guarda los campos personalizados
        title: string,
        date: string;
        location: string;
        cover_image: string;
        can_book: boolean;
        tag: number[];
    };
}

export interface ProjectI {
    id: number;
    link: string;
    category: ProjectCategory[];
    title: string,
    date: string;
    location: string;
    image: string;
    can_book: boolean;
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

interface ProjectCategory {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    taxonomy: string;
    meta: any[];
    acf: any[];
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


const useProjects = (lang: string) => {

    const [projects, setProjects] = useState<ProjectI[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Categories (project_categories)
    const [categories, setCategories] = useState<ProjectCategory[]>([]);
    const [currentCategory, setCurrentCategory] = useState<ProjectCategory | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch categories
                const categoriesData = await getCategories(lang);
                setCategories(categoriesData);

                // Obtener los proyectos
                const projectsData = await getProjects(lang);

                // Obtener los detalles y categorías de cada proyecto
                const projectsWithCategory: ProjectI[] = await Promise.all(
                    projectsData.map(async (project: ProjectIResponse) => {
                        const acfDetails: ProjectIResponse = await getProjectDetails(project.id, lang);
                        const categoryLabels = await Promise.all(
                            acfDetails.acf.tag.map(async (categoryId) => {
                                return getCategory(categoryId, lang);
                            })
                        );
                        const projectFinal: ProjectI = {
                            id: acfDetails.id,
                            category: categoryLabels || 'No Category',
                            title: acfDetails.acf.title,
                            date: acfDetails.acf.date,
                            location: acfDetails.acf.location,
                            link: acfDetails.link,
                            image: acfDetails.acf.cover_image,
                            can_book: acfDetails.acf.can_book,
                        }
                        return projectFinal;
                    })
                );

                // Filtrar proyectos por categoría
                const filteredProjects = currentCategory ? projectsWithCategory.filter(project =>
                    project.category.some(category => category.slug === currentCategory.slug)
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
    
    const switchCategory = (id?: number) => {
        if(id) {
            const current = categories.find((cat) => cat.id === id);
            if(current) setCurrentCategory(current);
        } else {
            setCurrentCategory(null)
        }
    }

    return { projects, loading, error, categories, currentCategory, switchCategory };
};

export default useProjects;
