import React, { useEffect, useState } from 'react';
import SprintList from '../components/Sprint/SprintList';
import CreateSprint from '../components/Sprint/CreateSprint';
import Layout from '../components/Layout';

const SprintPage = () => {
    const [sprints, setSprints] = useState([]);

    useEffect(() => {
      setSprints([
        {
          id: 'sprint1',
          name: 'Sprint 1',
          startDate: '2024-08-01',
          endDate: '2024-08-15',
          tasks: [
            {
              id: 'task1',
              title: 'Task 1',
              status: 'To Do',
              assignee: { fullName: 'John Doe' },
            },
            {
              id: 'task2',
              title: 'Task 2',
              status: 'In Progress',
              assignee: { fullName: 'Jane Smith' },
            },
          ],
        },
        {
          id: 'sprint2',
          name: 'Sprint 2',
          startDate: '2024-08-16',
          endDate: '2024-08-30',
          tasks: [
            {
              id: 'task3',
              title: 'Task 3',
              status: 'Done',
              assignee: { fullName: 'Alice Johnson' },
            },
          ],
        },
      ])
    }, [])
    
      
    const [projects] = useState([
        { id: 'project1', name: 'Project A' },
        { id: 'project2', name: 'Project B' },
    ]);

    const handleCreateSprint = (newSprint) => {
        setSprints([...sprints, { ...newSprint, id: sprints.length + 1, tasks: [] }]);
    };

    return (
        <Layout>
            <CreateSprint onSubmit={handleCreateSprint} projects={projects} />
            <SprintList sprints={sprints} />
        </Layout>
    );
};

export default SprintPage;
