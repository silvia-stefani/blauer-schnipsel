
import { getProjects } from '@/services/api';
import { ProjectIResponse } from '@/hooks/useProjects';
import ClientProjectPage from './Client';

export async function generateStaticParams() {
    const projects = await getProjects();
    return projects.map((project: ProjectIResponse) => ({
      slug: project.slug,
    }));
}

const ProjectPage = () => {

    return <ClientProjectPage />

};

export default ProjectPage;
