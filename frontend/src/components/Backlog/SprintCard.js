import { CheckCircleIcon, UserCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { CREATE_SPRINT } from '../../graphql/mutations';
import { GET_SPRINTS_WITH_TASKS } from '../../graphql/queries';
import { useMutation } from '@apollo/client';
import TaskIcon from '../TaskIcon';
import Avatar from '../../shared/Avatar';

function SprintCard({ sprint, selectedProject, closeAction }) {
    const [sprintName, setSprintName] = useState('');
    
    const [createSprint] = useMutation(CREATE_SPRINT, {
        refetchQueries: [{ query: GET_SPRINTS_WITH_TASKS, variables: { projectId: selectedProject?.id } }]
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
        <div className='flex flex-col gap-2 bg-gray-100 border p-4 rounded-md'>
            <div className='flex flex-row gap-2'>
                {
                    sprint ?
                        <div className='w-full flex flex-row justify-between items-center'>
                            <div className='text-base font-semibold capitalize'>{sprint?.name}</div>
                            {sprint?.name !== 'Backlog' && <div className='flex flex-row gap-2 items-center'>
                                <div className='flex flex-row gap-2'>
                                    <div className='bg-blue-600 text-white rounded-full flex flex-row justify-center items-center w-6 h-6 text-sm font-medium'>0</div>
                                    <div className='bg-green-600 text-white rounded-full flex flex-row justify-center items-center w-6 h-6 text-sm font-medium'>0</div>
                                </div>
                                <div className='border bg-white text-sm px-4 py-1 rounded-md'>{sprint?.status}</div>
                            </div>}
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
            <div className='flex flex-col divide-y divide-gray-200 bg-gray-50 rounded-md'>
                {
                    sprint?.tasks?.length > 0 ?
                        sprint?.tasks.map(t => (
                            <div className='flex flex-row justify-between items-center bg-white p-2 first:rounded-t-lg last:rounded-b-lg cursor-pointer select-none' key={t?.id}>
                                <div className='flex flex-row items-center gap-3'>
                                    <TaskIcon type={t?.ticketType} /> <span className={(t?.status === 'Done') && 'line-through text-gray-400'}>{t?.ticketNumber}</span> <span className='font-medium text-gray-700'>{t?.title}</span>
                                </div>
                                <div>
                                    {(t?.assignee || t?.reporter) ? <Avatar size={'xs'} name={t?.assignee?.fullName || t?.reporter?.fullName}/> : <UserCircleIcon className='w-6 h-6' title='Not assigned'/>}
                                </div>
                            </div>
                        )) :
                        <div className='w-full border-2 border-dashed border-gray-300 p-2 rounded-md flex flex-row text-xs justify-center items-center text-gray-400 select-none'>No tickets yet...</div>
                }
            </div>
        </div>
    )
}

export default SprintCard