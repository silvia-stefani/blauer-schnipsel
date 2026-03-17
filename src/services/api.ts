// URL base de la API de WordPress
const apiURL = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2`;

async function apiFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${apiURL}${path}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const getPageContent = async (slug: string) => {
  try {
    const pages = await apiFetch<any[]>(`/pages?slug=${slug}`);
    return pages[0]; // El primer resultado debería ser la página que buscamos
  } catch (error) {
    console.error("Error fetching page content:", error);
    return null;
  }
};

// Función para obtener los proyectos
export const getProjects = async () => {
  try {
    return await apiFetch<any[]>(`/projects`); // Devuelve la lista de proyectos
  } catch (error) {
    console.error('Error fetching projects:', error);
    return []; // Devuelve un array vacío en caso de error
  }
};

// Ottenere un porgetto
export const getProject = async (projectId: string) => {
  try {
    const projects = await apiFetch<any[]>(`/projects?slug=${projectId}`);
    return projects[0];
  } catch (error) {
    console.error("Error fetching project details:", error);
    return null;
  }
};

// Función para obtener las categorías de proyectos
export const getProjectCategories = async (id?: string) => {
    try {
      return await apiFetch<any>(`/project_category/${id ? id : ''}`);  // Devuelve las categorías
    } catch (error) {
      console.error('Error fetching category label:', error);
      return 'No Category';  // Valor por defecto si ocurre un error
    }
};

// Función para obtener la etiqueta (nombre) de una categoría por su ID
export const getMenu = async () => {
  try {
    return await apiFetch<any>(`/primary-menu`);  // Devuelve el nombre de la categoría
  } catch (error) {
    console.error('Error fetching category label:', error);
    return 'No Category';  // Valor por defecto si ocurre un error
  }
};

// Función para obtener los statements
export const getStatements = async () => {
  try {
    return await apiFetch<any>(`/statements`);  // Devuelve el listado
  } catch (error) {
    console.error('Error fetching statements:', error);
    return 'No Category';  // Valor por defecto si ocurre un error
  }
};

// Función para obtener los services
export const getServices = async () => {
  try {
    return await apiFetch<any>(`/services`);  // Devuelve el listado
  } catch (error) {
    console.error('Error fetching services:', error);
    return 'No Category';  // Valor por defecto si ocurre un error
  }
};

// Función para obtener los miembros del equipo
export const getTeam = async () => {
  try {
    return await apiFetch<any>(`/team?orderby=title&order=asc`);  // Devuelve el listado
  } catch (error) {
    console.error('Error fetching services:', error);
    return 'No Category';  // Valor por defecto si ocurre un error
  }
};

export const getContacts = async () => {
  try {
    return await apiFetch<any>(`/contact`);  // Devuelve el listado
  } catch (error) {
    console.error('Error fetching services:', error);
    return 'No Category';  // Valor por defecto si ocurre un error
  }
};

export const getCurriculumCategories = async () => {
  try {
    return await apiFetch<any>(`/curriculum_category`);
  } catch (error) {
    console.error('Error fetching services:', error);
    return 'No Category';  // Valor por defecto si ocurre un error
  }
};

export const getCurriculum = async () => {
  try {
    return await apiFetch<any>(`/curriculum?per_page=100`);
  } catch (error) {
    console.error('Error fetching services:', error);
    return 'No Category';  // Valor por defecto si ocurre un error
  }
};

export const getIntroTexts = async () => {
  try {
    return await apiFetch<any>(`/intro_text?per_page=100`);
  } catch (error) {
    console.error('Error fetching services:', error);
    return 'No Category';  // Valor por defecto si ocurre un error
  }
};

export const getIntroTextGroup = async (id?: number) => {
  try {
    return await apiFetch<any>(`/intro_group/${id ? id : ''}`);
  } catch (error) {
    console.error('Error fetching services:', error);
    return 'No Category';  // Valor por defecto si ocurre un error
  }
};

export const getProjectEvents = async () => {
  try {
    return await apiFetch<any>(`/projects?project_category=${process.env.NEXT_PUBLIC_EVENTSID}&project_category=${process.env.NEXT_PUBLIC_WORKSHOPSID}`);
  } catch (error) {
    console.error('Error fetching services:', error);
    return 'No Category';  // Valor por defecto si ocurre un error
  }
};
