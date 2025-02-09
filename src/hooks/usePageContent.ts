'use client'

import { getPageContent } from "@/services/pages";
import { useState, useEffect } from "react";

const usePageContent = (slug: string, lang: string) => {
  const [content, setContent] = useState<{acf: {[key: string] : string}} | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const page = await getPageContent(slug, lang);
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
