import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import TaskItem from './TaskItem';
import Moment from 'react-moment';
import moment from 'moment';

function SprintCard({ sprint, selectedProject, closeAction, updateSprint, createSprint, activeSprint, setCurrentTask }) {
    const [sprintName, setSprintName] = useState('');
    const now = moment(); // Get current date and time
    const twoWeeksLater = moment().add(14, 'days'); // Add 14 days to the current date

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
    useEffect(() => {
        // console.log(sprint?.tasks);
        
    }, [sprint?.tasks])

    const onUpdateSprint = (status) => {
        const payload = {
            sprintId: sprint?.id,
            status
        }
        if (status === 'In Progress') {
            payload.startDate = now.format();
            payload.endDate = twoWeeksLater.format();
        }
        if (status === 'Complete Sprint') {
            payload.endDate = twoWeeksLater.format();
        }
        updateSprint({
            variables: payload
        })
    }

    const onSelectTask = id => {
        console.log(id);
        
        setCurrentTask(id);
    }

    return (
        <div className='flex flex-col gap-2 bg-gray-100 border p-4 rounded-md'>
            <div className='flex flex-row gap-2'>
                {
                    sprint ?
                        <div className='w-full flex flex-row justify-between items-center'>
                            <div>
                                <div className='text-base font-semibold capitalize'>{sprint?.name}</div>
                                {!['Not Started'].includes(sprint?.status) && <div className='flex flex-row items-center gap-1 text-sm capitalize'>
                                    <Moment format="DD/MM/YYYY">{now}</Moment>
                                    <span>--</span>
                                    <Moment format="DD/MM/YYYY">{twoWeeksLater}</Moment>
                                    {sprint?.status === 'In Progress' && <div className='ml-4 text-xs font-semibold trackin-widest bg-green-700 text-white rounded px-2 py-1'>ACTIVE</div>}
                                </div>}
                            </div>
                            {sprint?.name !== 'Backlog' && <div className='flex flex-row gap-2 items-center'>
                                <div className='flex flex-row gap-2'>
                                    <div className='bg-blue-600 text-white rounded-full flex flex-row justify-center items-center w-6 h-6 text-sm font-medium'>0</div>
                                    <div className='bg-green-600 text-white rounded-full flex flex-row justify-center items-center w-6 h-6 text-sm font-medium'>0</div>
                                </div>

                                {
                                    activeSprint ? <>
                                        {activeSprint?.id === sprint?.id && <>

                                            {
                                                sprint?.status === 'In Progress' &&
                                                <button className='bg-blue-600 text-white px-4 py-1 text-sm rounded' onClick={() => onUpdateSprint('Completed')}>Complete Sprint</button>
                                            }
                                        </>}
                                    </> : <>
                                        {
                                            sprint?.status === 'Not Started' && (sprint?.tasks?.length > 0) &&
                                            <button className='bg-blue-600 text-white px-4 py-1 text-sm rounded' onClick={() => onUpdateSprint('In Progress')}>Start Sprint</button>
                                        }
                                    </>
                                }

                                {
                                    sprint?.status === 'Completed' &&
                                    <button className='border bg-white px-4 py-1 text-sm rounded-md'>Completed</button>
                                }
                            </div>}
                        </div> :
                        <div className='flex flex-row'>
                            <input type='text' placeholder='Sprint Name' className='px-4 py-1 rounded-md border-2' onChange={(e) => setSprintName(e.target.value)} />
                            <button onClick={onSubmit}>
                                <CheckCircleIcon className='w-8 h-8' />
                            </button>
                            <button onClick={() => closeAction()}>
                                <XCircleIcon className='w-8 h-8' />
                            </button>
                        </div>
                }
            </div>
            <div className='flex flex-col divide-y divide-gray-200 bg-gray-50 rounded-md'>
                {
                    sprint?.tasks?.length > 0 ?
                        sprint?.tasks.map(t => (
                            <TaskItem t={t} key={t?.id} onSelectTask={onSelectTask} />
                        )) :
                        <div className='w-full border-2 border-dashed border-gray-300 p-2 rounded-md flex flex-row text-xs justify-center items-center text-gray-400 select-none'>No tickets yet...</div>
                }
            </div>
        </div>
    )
}

export default SprintCard