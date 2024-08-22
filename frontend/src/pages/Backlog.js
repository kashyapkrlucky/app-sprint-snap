import React, { useState } from 'react';
import BacklogHeader from '../components/Backlog/BacklogHeader';
import Layout from '../components/Layout';
import SprintCard from '../components/Backlog/SprintCard';
import { GET_SPRINTS_WITH_TASKS } from '../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { useAppSelection } from '../contexts/AppSelectionContext';
import { CREATE_SPRINT, UPDATE_SPRINT } from '../graphql/mutations';
import TaskCard from '../components/Backlog/TaskCard';

const BacklogPage = () => {

    const { selectedProject } = useAppSelection();
    const [isSprintForm, setIsSprintForm] = useState(false);
    const [currentTask, setCurrentTask] = useState('');

    if (!selectedProject) { <p>test</p> };
    const { loading, error, data } = useQuery(GET_SPRINTS_WITH_TASKS, {
        variables: { projectId: selectedProject?.id, skip: !selectedProject?.id },
    });

    const [createSprint] = useMutation(CREATE_SPRINT, {
        refetchQueries: [{ query: GET_SPRINTS_WITH_TASKS, variables: { projectId: selectedProject?.id } }]
    });

    const [updateSprint] = useMutation(UPDATE_SPRINT, {
        refetchQueries: [{ query: GET_SPRINTS_WITH_TASKS, variables: { projectId: selectedProject?.id } }]
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading sprints</p>;
    const sprints = data?.sprintsWithTasks;

    const activeSprint = sprints.find(s => s.status === 'In Progress');

    return (
        <Layout>
            <div className='w-full p-4 flex flex-col gap-4'>
                {/* Header Section */}
                <BacklogHeader selectedProject={selectedProject} formAction={setIsSprintForm} />
                <div className='flex flex-row gap-4'>
                    <section className='w-full flex flex-col h-full gap-4 overflow-y-scroll'>
                        {isSprintForm && <SprintCard selectedProject={selectedProject} closeAction={setIsSprintForm} createSprint={createSprint} />}
                        {
                            sprints?.map(sprint => (
                                <SprintCard key={sprint?.id} sprint={sprint} activeSprint={activeSprint} updateSprint={updateSprint} setCurrentTask={setCurrentTask} />
                            ))
                        }
                    </section>
                    {
                        currentTask &&
                        <aside className='w-2/5'>
                            <TaskCard id={currentTask} setCurrentTask={setCurrentTask} />
                        </aside>
                    }

                </div>

            </div>
        </Layout>
    );
};

export default BacklogPage;
