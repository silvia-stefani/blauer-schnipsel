'use client'

import { PageI } from "@/interfaces/PageI.interface";
import { getPageContent } from "@/services/api";
import { useState, useEffect } from "react";

const usePageContent = (slug: string) => {
  
  const [content, setContent] = useState<{acf: PageI} | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const page = await getPageContent(slug);
        setContent(page);
      } catch (err) {
        setError("Failed to load page content");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [slug]);

  return { content, loading, error };
};

export default usePageContent;
