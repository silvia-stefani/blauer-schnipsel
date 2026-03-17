import { getProject } from '@/services/api';
import ClientProjectPage from './Client';

export const dynamic = 'force-dynamic';

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
