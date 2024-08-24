import React, { useState } from 'react';
import Layout from '../components/Layout';
import SprintCard from '../components/Backlog/SprintCard';
import { GET_SPRINTS_WITH_TASKS } from '../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { useAppSelection } from '../contexts/AppSelectionContext';
import { COMPLETE_SPRINT, CREATE_SPRINT, UPDATE_SPRINT } from '../graphql/mutations';
import TaskInPane from '../components/Backlog/TaskInPane';
import Loading from '../shared/Loading';

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

    const [completeSprint] = useMutation(COMPLETE_SPRINT, {
        refetchQueries: [{ query: GET_SPRINTS_WITH_TASKS, variables: { projectId: selectedProject?.id } }]
    });

    if (loading) return <Loading/>;
    if (error) return <p>Error loading sprints</p>;
    const sprints = data?.sprintsWithTasks;

    const activeSprint = sprints.find(s => s.status === 'In Progress');

    const futureSprints = sprints
        .filter(s => !['In Progress', 'Completed'].includes(s.status))
        .map(s => ({ id: s?.id, name: s?.name }));

    return (
        <Layout>
            <div className='w-full p-4 flex flex-col gap-4'>
                {/* Header Section */}
                <div className="py-4 flex justify-start items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-700">{selectedProject?.name}</h1>
                    <button className='bg-green-600 text-white px-4 py-1 rounded text-sm hover:bg-green-700' onClick={() => setIsSprintForm(true)}>Create Sprint</button>
                </div>
                <div className='flex flex-row gap-4'>
                    <section className='w-full flex flex-col h-full gap-4 overflow-y-scroll'>
                        {isSprintForm && <SprintCard selectedProject={selectedProject} closeAction={setIsSprintForm} createSprint={createSprint} />}
                        {
                            sprints?.map(sprint => (
                                <SprintCard key={sprint?.id} sprint={sprint} activeSprint={activeSprint} updateSprint={updateSprint} setCurrentTask={setCurrentTask} futureSprints={futureSprints} completeSprint={completeSprint} />
                            ))
                        }
                    </section>
                    {
                        currentTask &&
                        <aside className='w-2/5'>
                            <TaskInPane id={currentTask} setCurrentTask={setCurrentTask} />
                        </aside>
                    }

                </div>
            </div>
        </Layout>
    );
};

export default BacklogPage;
