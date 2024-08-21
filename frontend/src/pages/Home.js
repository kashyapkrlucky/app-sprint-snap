// pages/HomePage.js
import React, { useContext } from 'react';
import TaskList from '../components/Home/TaskList';
import ProjectList from '../components/Home/ProjectList';
import Layout from '../components/Layout';
import { AuthContext } from '../contexts/AuthContext';
import { GET_PROJECTS, GET_TASKS } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const HomePage = () => {
    const { user } = useContext(AuthContext);
    const { loading, error, data } = useQuery(GET_PROJECTS, {
        variables: {
            userId: user?.id,
            skip: !user
        }
    });

    const { data: taskList } = useQuery(GET_TASKS, {
        variables: {
            userId: user?.id,
            status: 'To Do'
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading projects in home</p>;

    return (
        <Layout>
            <div className='flex flex-col gap-4 w-full p-4 flex flex-col gap-4'>
                <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-semibold">Welcome, {user?.fullName}</h1>
                    <p className="text-base">Ready to tackle your tasks and projects?</p>
                </div>
                <div className="flex flex-row gap-4">
                    <div className='flex flex-col gap-4 w-1/3'>
                        <ProjectList projects={data?.projects} />
                    </div>
                    <div className='flex flex-row w-2/3'>
                        <TaskList tasks={taskList?.tasks} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
