'use client'

import { getProject } from "@/services/api";
import { useState, useEffect } from "react";
import { ProjectI, ProjectIResponse } from "./useProjects";
import { useArchive } from "@/contexts/ArchiveContext";

const usePageContent = (id: string) => {
  const [content, setContent] = useState<ProjectI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { categories } = useArchive();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        let page: ProjectIResponse = await getProject(id);
        const tags = categories.filter(item => page.acf.tags.includes(item.id));
        setContent({
          id: page.id,
          tags: tags,
          title: page.acf.title,
          date: page.acf.date,
          location: page.acf.location,
          image: page.acf.cover_image,
          can_book: page.acf.sign_up,
          gallery: page.image_gallery,
          slug: page.slug,
        });
      } catch (err) {
        setError("Failed to load page content");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id, categories]);

  return { content, loading, error };
};

export default usePageContent;
