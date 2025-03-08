import axios from 'axios';

// URL base de la API de WordPress
const apiURL = "http://blauerschnipsel.local/wp-json/wp/v2";

// Función para obtener los proyectos
export const getProjects = async (lang: string) => {
  try {
    const response = await axios.get(`${apiURL}/project?lang=${lang}`);
    return response.data; // Devuelve la lista de proyectos
  } catch (error) {
    console.error('Error fetching projects:', error);
    return []; // Devuelve un array vacío en caso de error
  }
};

// Función para obtener los proyectos
export const getProject = async (projectId: number) => {
  try {
    const response = await axios.get(`${apiURL}/project/${projectId}`);
    return response.data; // Ahora incluirá el campo "translations"
  } catch (error) {
    console.error("Error fetching project details:", error);
    return null;
  }
};

// Función para obtener los detalles de un proyecto usando ACF
export const getProjectDetails = async (projectId: number, lang: string) => {
  try {
    const response = await axios.get(`${apiURL}/project/${projectId}?acf_format=standard?lang=${lang}`);
    return response.data; // Devuelve los detalles del proyecto
  } catch (error) {
    console.error('Error fetching project details:', error);
    return null; // Devuelve null en caso de error
  }
};

// Función para obtener las categorías de proyectos
export const getCategories = async (lang: string) => {
    try {
      const response = await axios.get(`${apiURL}/project_tag?lang=${lang}`);
      return response.data;  // Devuelve las categorías
    } catch (error) {
      console.error('Error fetching category label:', error);
      return 'No Category';  // Valor por defecto si ocurre un error
    }
};

// Función para obtener la etiqueta (nombre) de una categoría por su ID
export const getCategory = async (categoryId: number, lang: string) => {
  try {
    const response = await axios.get(`${apiURL}/project_tag/${categoryId}?lang=${lang}`);
    return response.data;  // Devuelve el nombre de la categoría
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
    const response = await axios.get(`${apiURL}/curriculum`);
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return 'No Category';  // Valor por defecto si ocurre un error
  }
};
