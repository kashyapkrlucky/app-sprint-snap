import React from 'react';
import SprintHeader from '../components/CurrentSprint/SprintHeader';
import TaskBoard from '../components/CurrentSprint/TaskBoard';
import Layout from '../components/Layout';

const CurrentSprint = () => {
  return (
    <Layout>
      {/* Sprint Header */}
      <SprintHeader />

      {/* Task Board */}
      <div className="flex flex-col mx-auto w-full max-w-7xl mt-4 px-4">
        <TaskBoard />
      </div>
    </Layout>
  );
};

export default CurrentSprint;
