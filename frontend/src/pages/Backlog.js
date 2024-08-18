import React from 'react';
import BacklogHeader from '../components/Backlog/BacklogHeader';
import TaskList from '../components/Backlog/TaskList';

const BacklogPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Header Section */}
            <BacklogHeader />

            {/* Backlog List Section */}
            <div className="flex flex-col mx-auto w-full max-w-6xl mt-4">
                <TaskList title="Backlog" />
            </div>
        </div>
    );
};

export default BacklogPage;
