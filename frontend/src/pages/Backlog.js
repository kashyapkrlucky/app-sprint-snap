import React, { useState } from 'react';
import Layout from '../components/Layout';
import SprintCard from '../components/Backlog/SprintCard';
import { GET_SPRINTS_WITH_TASKS } from '../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { useAppSelection } from '../contexts/AppSelectionContext';
import { COMPLETE_SPRINT, CREATE_SPRINT, UPDATE_SPRINT, UPDATE_SPRINT_TASK } from '../graphql/mutations';
import TaskInPane from '../components/Backlog/TaskInPane';
import Loading from '../shared/Loading';
import { DragDropContext } from 'react-beautiful-dnd';
import Modal from '../shared/Modal';
import CreateSprint from '../components/Sprint/CreateSprint';

const BacklogPage = () => {

    const { selectedProject } = useAppSelection();
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const [updateSprintTask] = useMutation(UPDATE_SPRINT_TASK, {
        refetchQueries: [{ query: GET_SPRINTS_WITH_TASKS, variables: { projectId: selectedProject?.id } }]
    });

    const [completeSprint] = useMutation(COMPLETE_SPRINT, {
        refetchQueries: [{ query: GET_SPRINTS_WITH_TASKS, variables: { projectId: selectedProject?.id } }]
    });

    if (loading) return <Loading />;
    if (error) return <p>Error loading sprints</p>;
    const sprints = data?.sprintsWithTasks;

    const activeSprint = sprints.find(s => s.status === 'In Progress');

    const futureSprints = sprints
        .filter(s => !['In Progress', 'Completed'].includes(s.status))
        .map(s => ({ id: s?.id, name: s?.name }));

    const onDragEnd = (result) => {
        const { destination, source } = result;
        const payload = {
            sprintId: '',
            newSprintId: '',
            taskId: ''
        }
        if (!destination) return;

        if (source?.droppableId !== destination?.droppableId) {
            if (source?.droppableId === 'backlog') {
                const sItem = sprints.find(s => s?.name === 'Backlog');
                payload.taskId = sItem?.tasks[source?.index]?.id;
                payload.newSprintId = destination?.droppableId;
                payload.sprintId = null;
            } else {
                const sItem = sprints.find(s => s?.id === source?.droppableId);
                payload.taskId = sItem?.tasks[source?.index]?.id;
                payload.newSprintId = destination?.droppableId === 'backlog' ? null : destination?.droppableId;
                payload.sprintId = source?.droppableId;
            }
            updateSprintTask({
                variables: payload
            })
        }
    }

    return (
        <Layout>
            <div className='w-full p-4 flex flex-col gap-4'>
                <div className='flex flex-row gap-4'>
                    <section className='w-full flex flex-col h-screen-minus-200 overflow-y-scroll gap-4'>
                        <DragDropContext onDragEnd={onDragEnd}>
                            {
                                sprints?.map(sprint => (
                                    <SprintCard key={sprint?.id} sprint={sprint} activeSprint={activeSprint} updateSprint={updateSprint} setCurrentTask={setCurrentTask} futureSprints={futureSprints} completeSprint={completeSprint} />
                                ))
                            }
                        </DragDropContext>
                    </section>
                    {
                        currentTask &&
                        <aside className='w-2/5 flex flex-col gap-6 px-4 h-screen-minus-200 overflow-y-scroll'>
                            <TaskInPane id={currentTask} setCurrentTask={setCurrentTask} />
                        </aside>
                    }
                </div>
            </div>
            <Modal title={`Create Sprint`} isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); }}>
                <CreateSprint createSprint={createSprint} projectId={selectedProject?.id} modalAction={setIsModalOpen} />
            </Modal>
        </Layout>
    );
};

export default BacklogPage;
