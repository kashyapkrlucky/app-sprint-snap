// components/ProjectList.js
import React, { useState } from 'react';
import Avatar from '../../shared/Avatar';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Team from './Team';
import Modal from '../../shared/Modal';

const ProjectList = ({ projects }) => {
    const [members, setMembers] = useState([]);
    const [project, setProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="bg-white p-4 rounded-lg border">
            <h2 className="text-sm tracking-wide uppercase mb-4">Projects</h2>
            <ul className="space-y-4">
                {
                    projects?.length > 0 ? (
                        projects.map((project, index) => (
                            <li key={index} className="bg-white border p-4 rounded-lg">
                                <p className="font-semibold">{project.name}</p>
                                <p className="text-gray-600">{project.description}</p>
                                <h2 className="text-sm tracking-wide uppercase my-4">Team Members</h2>
                                <div className="flex flex-row items-center gap-2">
                                    {project?.members?.map((member, index) => (
                                        <div key={index} className="flex items-center cursor-pointer">
                                            <Avatar user={member} size='md'/>
                                        </div>
                                    ))}
                                    <div className='flex flex-row items-center'>
                                        <button onClick={() => {setMembers(project?.members); setIsModalOpen(true); setProject(project?.id) }}>
                                            <PlusCircleIcon className='w-10 h-10 text-gray-500' />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className='text-xs text-gray-400'>No projects yet...</p>
                    )
                }
            </ul>
            <Modal title={`My Teams`} isOpen={isModalOpen} onClose={() => {
                setIsModalOpen(false);
            }}>
                <Team team={members} project={project} />
            </Modal>
        </div>
    );
};

export default ProjectList;
