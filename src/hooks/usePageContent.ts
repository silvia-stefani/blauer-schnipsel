'use client'

import { PageI } from "@/interfaces/PageI.interface";
import { getPageContent } from "@/services/pages";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";


const usePageContent = (slug: string) => {

  const { i18n } = useTranslation();
  const lang = i18n.language;
  
  const [content, setContent] = useState<{acf: PageI} | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const page = await getPageContent(`${slug}`, lang);
        setContent(page);
      } catch (err) {
        setError("Failed to load page content");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [slug, lang]);

  return { content, loading, error };
};

export default usePageContent;
