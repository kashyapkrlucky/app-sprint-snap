import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { CREATE_SPRINT } from '../../graphql/mutations';
import { GET_SPRINTS } from '../../graphql/queries';
import { useMutation } from '@apollo/client';

function SprintCard({ sprint, selectedProject, closeAction }) {
    const [sprintName, setSprintName] = useState('');
    const [createSprint] = useMutation(CREATE_SPRINT, {
        refetchQueries: [{ query: GET_SPRINTS, variables: { projectId: selectedProject?.id } }]
    });

    const onSubmit = () => {
        createSprint({
            variables: {
                name: sprintName,
                projectId: selectedProject?.id
            }
        })
        setSprintName('');
        closeAction();
    }
    return (
        <div className='flex flex-col gap-2 bg-gray-100 border p-4'>
            <div className='flex flex-row gap-2'>
                {
                    sprint ?
                        <div className='w-full flex flex-row justify-between items-center'>
                            <div className='text-base font-semibold capitalize'>{sprint?.name}</div>
                            <div className='flex flex-row gap-2 items-center'>
                                <div className='flex flex-row gap-2'>
                                    <div className='bg-blue-600 text-white rounded-full flex flex-row justify-center items-center w-6 h-6 text-sm font-medium'>0</div>
                                    <div className='bg-green-600 text-white rounded-full flex flex-row justify-center items-center w-6 h-6 text-sm font-medium'>0</div>
                                </div>
                                <div className='border bg-white text-sm px-4 py-1 rounded-md'>{sprint?.status}</div>
                            </div>
                        </div> :
                        <div className='flex flex-row'>
                            <input type='text' placeholder='Sprint Name' className='px-4 py-1 rounded-md border-2' onChange={(e) => setSprintName(e.target.value)} />
                            <button onClick={onSubmit}>
                                <CheckCircleIcon className='w-6 h-6' />
                            </button>
                            <button onClick={() => closeAction()}>
                                <XCircleIcon className='w-6 h-6' />
                            </button>
                        </div>
                }
            </div>
            <div className='flex flex-col gap-4 py-4 border-2 border-dashed border-gray-400 bg-gray-100 rounded-md'>
                {
                    sprint?.tasks?.length > 0 ?
                        sprint?.tasks.map(t => (
                            <div key={t}>
                                {t}
                            </div>
                        )) :
                        <div className='w-full flex flex-row text-xs justify-center items-center text-gray-400 select-none'>No tickets yet...</div>
                }
            </div>
        </div>
    )
}

export default SprintCard