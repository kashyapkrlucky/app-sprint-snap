import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import { GET_PROJECTS } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../contexts/AuthContext';
import Loading from '../shared/Loading';
import Moment from 'react-moment'
import Modal from '../shared/Modal';
import CreateProject from '../components/Projects/CreateProject';

const ProjectPage = () => {
    const { user } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // const handleEditProject = (updatedProject) => {

    // };

    // const handleDeleteProject = (projectId) => {

    // };

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const { loading, error, data } = useQuery(GET_PROJECTS, { variables: { userId: user?.id } });

    if (loading) return <Loading />;
    if (error) return <p>Error loading projects</p>;
    const projects = data?.projects;

    return (
        <Layout>

            <div className='flex flex-row justify-between px-6 py-4'>
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                        My Projects
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        this is a projects page
                    </p>
                </div>
                <div>
                    <button
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                        className="w-full text-left px-4 py-1 bg-blue-500 hover:bg-blue-600 rounded text-white"
                    >
                        + Add Project
                    </button>
                </div>
            </div>

            <div className='flex flex-col gap-4 p-6 pt-0'>
                <div className='border-y flex flex-row gap-2 py-2 text-sm font-bold text-gray-500'>
                    <div className='w-4/12'>
                        Title & Description
                    </div>
                    <div className='w-2/12'>
                        Start Date
                    </div>
                    <div className='w-2/12'>
                        Status
                    </div>
                    <div className='w-2/12'>
                        My Role
                    </div>
                    <div className='w-2/12'>
                        Actions
                    </div>
                </div>
                {projects.map((project) => (
                    <div className='flex flex-row gap-2 items-center' key={project?.id}>
                        <div className='w-4/12'>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {project?.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {project?.description || 'No description available'}
                            </p>
                        </div>
                        <div className='w-2/12'>
                            <p className="text-sm text-gray-500">
                                <Moment format="DD-MMM-YYYY HH:MM">{project?.startDate}</Moment>
                            </p>
                        </div>
                        <div className='w-2/12'>
                            <span className='text-emerald-600 text-sm'>Active</span>
                        </div>
                        <div className='w-2/12'>
                            <span className='text-sm'>Owner</span>
                        </div>
                        <div className='w-2/12 flex flex-row gap-4'>
                            <button className='border rounded border-blue-300 bg-blue-100 text-sm py-0 px-3'>Edit</button>
                            <button className='border rounded border-green-300 bg-green-100 text-sm py-0 px-3'>Add User</button>
                        </div>
                    </div>
                ))}
            </div>
            <Modal title={'Create Project'} isOpen={isModalOpen} onClose={() => { closeModal() }}>
                <CreateProject closeModal={closeModal} />
            </Modal>
        </Layout>
    );
};

export default ProjectPage;
