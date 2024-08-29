import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../graphql/queries";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useAppSelection } from "../../contexts/AppSelectionContext";
import { AuthContext } from "../../contexts/AuthContext";

const ProjectDropdown = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { selectedProject, setSelectedProject } = useAppSelection();
  
  // Fetch projects from backend using GraphQL
  const { loading, error, data } = useQuery(GET_PROJECTS, {
    variables: {
      userId: user?.id,
      skip: !user
    }
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setIsOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading projects in dropdown</p>;

  return (
    <div className="relative">
      {/* Dropdown Toggle Button */}
      <button
        onClick={toggleDropdown}
        className="bg-gray-100 font-bold px-4 py-2 rounded-lg flex items-center"
      >
        {selectedProject?.name || "Select Project"}
        <ChevronDownIcon className="w-4 h-4 ml-2" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-1 w-48 bg-white border shadow-lg rounded-lg z-10">
          <ul className="py-1">
            {data.projects.map((project) => (
              <li
                key={project?.id}
                onClick={() => handleProjectSelect(project)}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer border-b"
              >
                {project?.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProjectDropdown;
