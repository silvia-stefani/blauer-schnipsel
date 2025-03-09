import { useState, useEffect } from 'react';
import { getProjects, getCategory } from '@/services/api';
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
    slug: string;
    image_gallery: string[] | [];
    acf: {
        title: {[key: string]: string};
        date: string;
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
    date: string;
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
