import axios from 'axios';

// URL base de la API de WordPress
const apiURL = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2`;

export const getPageContent = async (slug: string) => {
  try {
    const res = await fetch(`${apiURL}/pages?slug=${slug}`);
    if (!res.ok) throw new Error("Failed to fetch page content");
    const pages = await res.json();
    return pages[0]; // El primer resultado debería ser la página que buscamos
  } catch (error) {
    console.error("Error fetching page content:", error);
    return null;
  }
};

// Función para obtener los proyectos
export const getProjects = async () => {
  try {
    const response = await axios.get(`${apiURL}/projects`);
    return response.data; // Devuelve la lista de proyectos
  } catch (error) {
    console.error('Error fetching projects:', error);
    return []; // Devuelve un array vacío en caso de error
  }
};

// Ottenere un porgetto
export const getProject = async (projectId: string) => {
  try {
    const response = await axios.get(`${apiURL}/projects?slug=${projectId}`);
    return response.data[0];
  } catch (error) {
    console.error("Error fetching project details:", error);
    return null;
  }
};

// Función para obtener las categorías de proyectos
export const getProjectCategories = async (id?: string) => {
    try {
      const response = await axios.get(`${apiURL}/project_category/${id ? id : ''}`);
      return response.data;  // Devuelve las categorías
    } catch (error) {
      console.error('Error fetching category label:', error);
      return 'No Category';  // Valor por defecto si ocurre un error
    }
};

// Función para obtener la etiqueta (nombre) de una categoría por su ID
export const getMenu = async () => {
  try {
    const response = await axios.get(`${apiURL}/primary-menu`);
    return response.data;  // Devuelve el nombre de la categoría
  } catch (error) {
    console.error('Error fetching category label:', error);
    return 'No Category';  // Valor por defecto si ocurre un error
  }
};

// Función para obtener los statements
export const getStatements = async () => {
  try {
    const response = await axios.get(`${apiURL}/statements`);
    return response.data;  // Devuelve el listado
  } catch (error) {
    console.error('Error fetching statements:', error);
    return 'No Category';  // Valor por defecto si ocurre un error
  }
};

// Función para obtener los services
export const getServices = async () => {
  try {
    const response = await axios.get(`${apiURL}/services`);
    return response.data;  // Devuelve el listado
  } catch (error) {
    console.error('Error fetching services:', error);
    return 'No Category';  // Valor por defecto si ocurre un error
  }
};

// Función para obtener los miembros del equipo
export const getTeam = async () => {
  try {
    const response = await axios.get(`${apiURL}/team?orderby=title&order=asc`);
    return response.data;  // Devuelve el listado
  } catch (error) {
    console.error('Error fetching services:', error);
    return 'No Category';  // Valor por defecto si ocurre un error
  }
};

export const getContacts = async () => {
  try {
    const response = await axios.get(`${apiURL}/contact`);
    return response.data;  // Devuelve el listado
  } catch (error) {
    console.error('Error fetching services:', error);
    return 'No Category';  // Valor por defecto si ocurre un error
  }
};

export const getCurriculumCategories = async () => {
  try {
    const response = await axios.get(`${apiURL}/curriculum_category`);
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return 'No Category';  // Valor por defecto si ocurre un error
  }
};

export const getCurriculum = async () => {
  try {
    const response = await axios.get(`${apiURL}/curriculum?per_page=100`);
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return 'No Category';  // Valor por defecto si ocurre un error
  }
};

export const getIntroTexts = async () => {
  try {
    const response = await axios.get(`${apiURL}/intro_text?per_page=100`);
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return 'No Category';  // Valor por defecto si ocurre un error
  }
};

export const getIntroTextGroup = async (id?: number) => {
  try {
    const response = await axios.get(`${apiURL}/intro_group/${id ? id : ''}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return 'No Category';  // Valor por defecto si ocurre un error
  }
};

export const getProjectEvents = async () => {
  try {
    const response = await axios.get(`${apiURL}/projects?project_category=${process.env.NEXT_PUBLIC_EVENTSID}&project_category=${process.env.NEXT_PUBLIC_WORKSHOPSID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return 'No Category';  // Valor por defecto si ocurre un error
  }
};