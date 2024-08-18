import React, { useState } from 'react';
import ProjectList from '../components/Projects/ProjectList';
import Layout from '../components/Layout';
import { GET_PROJECTS } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import TopBar from '../components/Layout/TopBar';

const ProjectPage = () => {
    const [projects, setProjects] = useState([]);

    const handleEditProject = (updatedProject) => {
        setProjects(
            projects.map((project) =>
                project.id === updatedProject.id ? updatedProject : project
            )
        );
    };

    const handleDeleteProject = (projectId) => {
        setProjects(projects.filter((project) => project.id !== projectId));
    };


    const { loading, error, data } = useQuery(GET_PROJECTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading projects</p>;
    return (
        <main>
            <TopBar/>
            <ProjectList
                projects={data?.projects}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
            />
        </main>
    );
};

export default ProjectPage;
