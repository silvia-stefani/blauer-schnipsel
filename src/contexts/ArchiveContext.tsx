'use client'

import { getProjectCategories } from '@/services/api';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Contexto
interface ArchiveContextType {
    currentCategory: ArchiveCategoryI | null;
    categories: ArchiveCategoryI[];
    switchCategory: (id?: number) => void;
    loading: boolean;
    error: string;
}

// Creamos el contexto con un valor inicial vacío
const ArchiveContext = createContext<ArchiveContextType | undefined>(undefined);

// Componente proveedor del contexto
interface ArchiveProviderProps {
    children: ReactNode;
}

export const ArchiveProvider: React.FC<ArchiveProviderProps> = ({ children }) => {

    
    // Categories (project_categories)
    const [categories, setCategories] = useState<ArchiveCategoryI[]>([]);
    const [currentCategory, setCurrentCategory] = useState<ArchiveCategoryI | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch categories
                const categoriesData = await getProjectCategories();
                const c: ArchiveCategoryI[] = categoriesData.map((cd: any) => {
                    return {
                        id: cd.id,
                        name: cd.acf.label,
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
    }, [currentCategory]);  // Se ejecuta una sola vez cuando el componente se monta

    const switchCategory = (id?: number) => {
        if (id) {
            const current = categories.find((cat) => cat.id === id);
            if (current) setCurrentCategory(current);
        } else {
            setCurrentCategory(null)
        }
    }

    return (
        <ArchiveContext.Provider value={{ currentCategory, categories, switchCategory, loading, error }}>
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

