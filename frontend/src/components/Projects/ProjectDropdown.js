import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../graphql/queries"; // GraphQL query to get the projects
import CreateProject from "./CreateProject";
import Modal from "../../shared/Modal";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useAppSelection } from "../../contexts/AppSelectionContext";

const ProjectDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedProject, setSelectedProject } = useAppSelection();
  // Fetch projects from backend using GraphQL
  const { loading, error, data } = useQuery(GET_PROJECTS);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setIsOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsOpen(false);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading projects</p>;

  return (
    <div className="relative">
      {/* Dropdown Toggle Button */}
      <button
        onClick={toggleDropdown}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center capitalize"
      >
        {selectedProject?.name || "Select a Project"}
        <ChevronDownIcon className="w-6 h-6" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white border shadow-lg rounded-lg z-10">
          <ul className="py-1">
            {data.projects.map((project) => (
              <li
                key={project.id}
                onClick={() => handleProjectSelect(project)}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                {project.name}
              </li>
            ))}
            <li className="border-t mt-1">
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100"
              >
                + Add Project
              </button>
            </li>
          </ul>
        </div>
      )}

      <Modal title={'Create Project'} isOpen={isModalOpen} onClose={() => { closeModal() }}>
        <CreateProject closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default ProjectDropdown;
