import React, { useState } from 'react';
import BacklogHeader from '../components/Backlog/BacklogHeader';
import TaskList from '../components/Backlog/TaskList';
import Layout from '../components/Layout';
import SprintCard from '../components/Backlog/SprintCard';
import { GET_SPRINTS } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useAppSelection } from '../contexts/AppSelectionContext';

const BacklogPage = () => {

    const { selectedProject } = useAppSelection();
    const [isSprintForm, setIsSprintForm] = useState(false);
    const { loading, error, data } = useQuery(GET_SPRINTS, {
        variables: { projectId: selectedProject?.id },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading projects</p>;
    const sprints = data?.sprints;

    return (
        <Layout>
            <div className='flex flex-col gap-4 w-full p-4 flex flex-col gap-4'>
                {/* Header Section */}
                <BacklogHeader formAction={setIsSprintForm}/>
                {isSprintForm && <SprintCard selectedProject={selectedProject} name={''} closeAction={setIsSprintForm} />}
                {
                    sprints?.map(sprint => (
                        <SprintCard key={sprint?.id} sprint={sprint} />
                    ))
                }
                {/* <TaskList title="Backlog" /> */}
            </div>
        </Layout>
    );
};

export default BacklogPage;
