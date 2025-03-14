import { getProject, getProjects } from '@/services/api';  // Asegúrate de que esta función esté definida en tu API
import { ProjectIResponse } from '@/hooks/useProjects';
import ClientProjectPage from './Client';


// Esta función genera las rutas estáticas para los proyectos
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project: ProjectIResponse) => ({
    slug: project.slug, // Generamos una ruta dinámica usando el slug
  }));
}

// Página del proyecto
const ProjectPage = async ({ params }: { params: { slug: string } }) => {
  // Aquí obtenemos los datos del proyecto con el slug de los parámetros
  const project = await getProject(params.slug);
  
  if (!project) {
    return <div>Proyecto no encontrado</div>; // O redirigir a una página 404
  }
  return <ClientProjectPage projectResponse={project} />;
};

export default ProjectPage;
