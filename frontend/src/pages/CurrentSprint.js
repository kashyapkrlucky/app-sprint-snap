import React from 'react';
import SprintHeader from '../components/CurrentSprint/SprintHeader';
import TaskBoard from '../components/CurrentSprint/TaskBoard';

const CurrentSprint = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Sprint Header */}
      <SprintHeader />

      {/* Task Board */}
      <div className="flex flex-col mx-auto w-full max-w-7xl mt-4 px-4">
        <TaskBoard />
      </div>
    </div>
  );
};

export default CurrentSprint;
