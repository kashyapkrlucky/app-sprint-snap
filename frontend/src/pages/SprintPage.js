import React from 'react';
import Layout from '../components/Layout';
import { GET_SPRINT } from '../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import SprintHeader from '../components/Sprint/SprintHeader';
import TaskBoard from '../components/Sprint/TaskBoard';
import { UPDATE_TASK_STATUS } from '../graphql/mutations';
import { useAppSelection } from '../contexts/AppSelectionContext';
import Loading from '../shared/Loading';

const SprintPage = () => {
  const { selectedProject } = useAppSelection();

  const { loading, error, data } = useQuery(GET_SPRINT, {
    variables: { sprintId: selectedProject?.activeSprint, skip: !selectedProject?.activeSprint },
  });

  const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS, {
    refetchQueries: [{ query: GET_SPRINT, variables: { sprintId: selectedProject?.activeSprint } }]
  });

  const addPoints = (tasks, type) => {
    const points = tasks?.reduce((a, x) => {
      if (x.status === type) {
        return a + x.points;
      } else {
        return a;  // Return the accumulator unchanged if status is not 'Done'
      }
    }, 0);
    return points;
  }

  if (!selectedProject?.activeSprint) {
    return (
      <Layout>
        <div className='w-full h-full flex flex-row justify-center p-10 text-gray-500'>
          <h2 className="text-2xl">No Active Sprint</h2>
        </div>
      </Layout>
    );
  }

  if (loading) return <Loading/>;
  if (error) return <p>Error loading sprints</p>;

  const sprint = data?.sprint;

  const toDo = addPoints(sprint?.tasks, 'To Do');
  const inProgress = addPoints(sprint?.tasks, 'InProgress');
  const done = addPoints(sprint?.tasks, 'Done');
  const total = toDo + inProgress + done;

  const points = {
    toDo,
    inProgress,
    done,
    total,
    progress: parseInt((done / total) * 100)
  }

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

  return (
    <Layout>
      <SprintHeader sprint={sprint} points={points} members={selectedProject?.members}></SprintHeader>
      {/* Task Board */}
      <div className="flex flex-col px-4">
        <TaskBoard list={tasksByStatus} updateTaskStatus={updateTaskStatus} />
      </div>
    </Layout>
  );
};

export default SprintPage;
