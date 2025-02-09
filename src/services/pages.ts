const apiURL = "http://blauerschnipsel.local/wp-json/wp/v2";

export const getPageContent = async (slug: string, lang: string) => {
    try {
      const res = await fetch(`${apiURL}/pages?slug=${slug}&lang=${lang}`);
      if (!res.ok) throw new Error("Failed to fetch page content");
      const pages = await res.json();
      return pages[0]; // El primer resultado debería ser la página que buscamos
    } catch (error) {
      console.error("Error fetching page content:", error);
      return null;
    }
  };