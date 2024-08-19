// components/ProjectList.js
import React from 'react';

const ProjectList = ({ projects }) => {
    return (
        <div className="bg-white p-4 rounded-lg border">
            <h2 className="text-sm tracking-wide uppercase mb-4">Projects</h2>
            <ul className="space-y-4">
                {projects.map((project, index) => (
                    <li key={index} className="bg-gray-100 p-4 rounded-lg">
                        <p className="font-semibold">{project.name}</p>
                        <p className="text-gray-600">{project.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;
