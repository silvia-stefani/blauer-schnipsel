'use client'

import { getCategory, getProject, getProjectDetails } from "@/services/api";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ProjectI } from "./useProjects";

const usePageContent = (id: number) => {
  const [content, setContent] = useState<ProjectI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();
  const { language: lang } = i18n;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        let page = await getProject(id);
        if(!(page.id === page.translations[lang])) {
          page = await getProject(page.translations[lang]);
        }
        const categoryLabels = await Promise.all(
            page.acf.tag.map(async (categoryId: number) => {
                return getCategory(categoryId, lang);
            })
        );
        setContent({
          id: page.id,
          category: categoryLabels || 'No Category',
          title: page.acf[`title_${page.lang}`] as string,
          date: page.acf.date,
          location: page.acf.location,
          link: page.link,
          image: page.acf.cover_image,
          can_book: page.acf.can_book,
          lang: page.lang,
          gallery: page.image_gallery,
        });
      } catch (err) {
        setError("Failed to load page content");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id, lang]);

  return { content, loading, error };
};

export default usePageContent;
