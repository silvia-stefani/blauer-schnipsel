import { useState, useEffect } from 'react';
import { getProjects } from '@/services/api';
import { useArchive } from '@/contexts/ArchiveContext';

// Este hook maneja la obtención de proyectos y categorías.

export interface TaxonomyI {
    term_id: number;
    name: string;
    slug: string;
    term_group: number;
    term_taxonomy_id: number;
    taxonomy: string;
    description: string;
    parent: number;
    count: number;
    filter: string;
}

export interface ProjectIResponse {
    id: number;
    title: {
        rendered: string;
    };
    content: { rendered: string };
    link: string;
    slug: string;
    image_gallery: string[] | [];
    acf: {
        title: {[key: string]: string};
        date: {
            end: string;
            start: string;
            year: TaxonomyI;
        };
        location: string;
        cover_image: string;
        sign_up: boolean;
        tags: number[];
    };
    tags: number[];
}

export interface ProjectI {
    id: number;
    tags: ArchiveCategoryI[];
    title: {[key: string]: string};
    date: {
        end: string;
        start: string;
        year: TaxonomyI;
    };
    location: string;
    image: string;
    can_book: boolean;
    gallery: string[] | [];
    slug: string;
}

const useProjects = () => {
    
    const [projects, setProjects] = useState<ProjectI[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { currentCategory, categories } = useArchive();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Obtener los proyectos
                const projectsData: ProjectIResponse[] = await getProjects();
                const updatedProjects: ProjectI[] = projectsData.map((pd) => {
                    const tags = categories.filter(item => pd.acf.tags.includes(item.id));
                    return {
                        id: pd.id,
                        can_book: pd.acf.sign_up,
                        tags: tags,
                        date: pd.acf.date,
                        location: pd.acf.location,
                        gallery: [],
                        image: pd.acf.cover_image,
                        title: pd.acf.title,
                        slug: pd.slug,
                    };
                });

                setProjects(updatedProjects); // Actualiza el estado con los proyectos modificados

                
            } catch (error) {
                setError('Error loading projects');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [categories, currentCategory]);  // Se ejecuta una sola vez cuando el componente se monta
    
    return { projects, loading, error };
};

export default useProjects;
