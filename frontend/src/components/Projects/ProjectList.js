import React from 'react';

const ProjectList = ({ projects, onEdit, onDelete }) => {
    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">
                            {project.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            {project.description || 'No description available'}
                        </p>
                        <p className="text-xs text-gray-500 mb-2">
                            Start Date: {new Date(project.startDate).toLocaleDateString()}
                        </p>
                        <div className="mt-4 flex justify-between items-center">
                            <button
                                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                onClick={() => onEdit(project)}
                            >
                                Edit
                            </button>
                            <button
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                                onClick={() => onDelete(project.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectList;
