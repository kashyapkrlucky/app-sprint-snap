import React from 'react';
import BacklogHeader from '../components/Backlog/BacklogHeader';
import TaskList from '../components/Backlog/TaskList';
import Layout from '../components/Layout';
import SprintCard from '../components/Backlog/SprintCard';

const BacklogPage = () => {
    return (
        <Layout>
            <div className='flex flex-col gap-4 w-full p-4 flex flex-col gap-4'>
                {/* Header Section */}

                <BacklogHeader />

                <SprintCard name={''} />

                <TaskList title="Backlog" />
            </div>
        </Layout>
    );
};

export default BacklogPage;
