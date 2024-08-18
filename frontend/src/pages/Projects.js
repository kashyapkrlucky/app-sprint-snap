import React, { useState } from 'react';
import CreateProject from '../components/Projects/CreateProject';
import ProjectList from '../components/Projects/ProjectList';

const ProjectPage = () => {
    const [projects, setProjects] = useState([]);

    const handleCreateProject = (newProject) => {
        setProjects([...projects, { ...newProject, id: projects.length + 1 }]);
    };

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

    return (
        <div className="container mx-auto py-8">
            <CreateProject onSubmit={handleCreateProject} />
            <ProjectList
                projects={projects}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
            />
        </div>
    );
};

export default ProjectPage;
