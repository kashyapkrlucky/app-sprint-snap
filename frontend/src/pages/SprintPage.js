import React from 'react';
import TaskBoard from '../components/CurrentSprint/TaskBoard';
import Layout from '../components/Layout';
import { GET_SPRINT } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import SprintHeader from '../components/Sprint/SprintHeader';

const SprintPage = () => {
  const { loading, error, data } = useQuery(GET_SPRINT, {
    variables: { sprintId: '66c3aec6a905a7d06bfca2fa' },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading sprints</p>;
  const sprint = data?.sprint;

  const tasksByStatus = [
    { id: 'toDo', name: 'To Do', list: [] },
    { id: 'inProgress', name: 'In Progress', list: [] },
    { id: 'done', name: 'Done', list: [] },
  ];

  sprint?.tasks.forEach(task => {
    const status = tasksByStatus.find(status => status.name === task.status);
    if (status) {
      status.list.push(task);
    }
  });
  
  console.log(tasksByStatus);

  return (
    <Layout>
      <SprintHeader sprint={sprint}></SprintHeader>
      {/* Task Board */}
      <div className="flex flex-col px-4">
        <TaskBoard list={tasksByStatus} />
      </div>
    </Layout>
  );
};

export default SprintPage;
