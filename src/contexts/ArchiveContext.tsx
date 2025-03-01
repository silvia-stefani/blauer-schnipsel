'use client'

import { getCategories } from '@/services/api';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Contexto
interface ArchiveContextType {
    currentCategory: ArchiveCategoryI | null;
    categories: ArchiveCategoryI[];
    switchCategory: (id?: string) => void;
}

// Creamos el contexto con un valor inicial vacío
const ArchiveContext = createContext<ArchiveContextType | undefined>(undefined);

// Componente proveedor del contexto
interface ArchiveProviderProps {
    children: ReactNode;
}

export const ArchiveProvider: React.FC<ArchiveProviderProps> = ({ children }) => {

    const { i18n } = useTranslation();
    const lang = i18n.language;

    // Categories (project_categories)
    const [categories, setCategories] = useState<ArchiveCategoryI[]>([]);
    const [currentCategory, setCurrentCategory] = useState<ArchiveCategoryI | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch categories
                const categoriesData = await getCategories(lang);
                const c: ArchiveCategoryI[] = categoriesData.map((cd: any) => {
                    return {
                        id: cd.id,
                        name: cd.name,
                        slug_lang: cd.slug,
                        slug_common: cd.acf.Tag_ID,
                    }
                })
                setCategories(c);

            } catch (error) {
                setError('Error loading projects');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [lang, currentCategory]);  // Se ejecuta una sola vez cuando el componente se monta

    const switchCategory = (id?: string) => {
        if (id) {
            const current = categories.find((cat) => cat.slug_common === id);
            if (current) setCurrentCategory(current);
        } else {
            setCurrentCategory(null)
        }
    }

    return (
        <ArchiveContext.Provider value={{ currentCategory, categories, switchCategory }}>
            {children}
        </ArchiveContext.Provider>
    );
};

// Hook para consumir el contexto
export const useArchive = (): ArchiveContextType => {
    const context = useContext(ArchiveContext);

    if (!context) {
        throw new Error('useArchive must be used within a ArchiveProvider');
    }

    return context;
};

