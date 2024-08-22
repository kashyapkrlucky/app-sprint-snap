import React from 'react';
import TaskBoard from '../components/CurrentSprint/TaskBoard';
import Layout from '../components/Layout';

const CurrentSprint = () => {
  return (
    <Layout>

      {/* Task Board */}
      <div className="flex flex-col mx-auto w-full max-w-7xl mt-4 px-4">
        <TaskBoard />
      </div>
    </Layout>
  );
};

export default CurrentSprint;
