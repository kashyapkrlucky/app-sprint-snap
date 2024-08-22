import React, { useState } from 'react';
import BacklogHeader from '../components/Backlog/BacklogHeader';
import Layout from '../components/Layout';
import SprintCard from '../components/Backlog/SprintCard';
import { GET_SPRINTS_WITH_TASKS } from '../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { useAppSelection } from '../contexts/AppSelectionContext';
import { CREATE_SPRINT, UPDATE_SPRINT } from '../graphql/mutations';

const BacklogPage = () => {

    const { selectedProject } = useAppSelection();
    const [isSprintForm, setIsSprintForm] = useState(false);

    if (!selectedProject) {<p>test</p>};
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

    return (
        <Layout>
            <div className='flex flex-col gap-4 w-full p-4 flex flex-col gap-4'>
                {/* Header Section */}
                <BacklogHeader formAction={setIsSprintForm}/>
                {isSprintForm && <SprintCard selectedProject={selectedProject} closeAction={setIsSprintForm} createSprint={createSprint}  />}
                {
                    sprints?.map(sprint => (
                        <SprintCard key={sprint?.id} sprint={sprint} updateSprint={updateSprint}/>
                    ))
                }
            </div>
        </Layout>
    );
};

export default BacklogPage;
