import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import TaskItem from './TaskItem';
import Moment from 'react-moment';
import moment from 'moment';
import Modal from '../../shared/Modal';

function SprintCard({ sprint, selectedProject, closeAction, updateSprint, createSprint, activeSprint, setCurrentTask, futureSprints, completeSprint }) {
    const [sprintName, setSprintName] = useState('');

    const now = moment(); // Get current date and time
    const twoWeeksLater = moment().add(14, 'days'); // Add 14 days to the current date
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSprintId, setNewSprintId] = useState('')

    const [donePoints, setDonePoints] = useState(0);
    const [pendingPoints, setPendingPoints] = useState(0);
    const [pendingTickets, setPendingTickets] = useState([]);

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
        setDonePoints(addPoints(sprint?.tasks, 'Done'));
        setPendingPoints(addPoints(sprint?.tasks, 'In Progress'));
        const items = sprint?.tasks?.filter(x => ['In Progress', 'Review', 'To Do'].includes(x?.status)).map(x => x.id)
        setPendingTickets(items)
    }, [sprint?.tasks]);

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
            payload.nextSprint = '';
        }
        updateSprint({
            variables: payload
        })
    }

    const onSelectTask = id => {
        setCurrentTask(id);
    }

    const onCompleteSprint = () => {
        const payload = {
            sprintId: sprint?.id,
            newSprintId,
            taskIds: pendingTickets
        }
        console.log(payload);
        completeSprint({
            variables: payload
        })
    }
    return (
        <div className='flex flex-col gap-2 bg-gray-100 border p-4 rounded-md'>
            <div className='flex flex-row gap-2'>
                {
                    sprint ?
                        <div className='w-full flex flex-row justify-between items-center'>
                            <div>
                                <div className='text-sm lg:text-base font-semibold capitalize'>{sprint?.name}</div>
                                {!['Not Started'].includes(sprint?.status) && <div className='flex flex-row items-center gap-1 text-xs lg:text-sm capitalize'>
                                    <Moment format="DD/MM/YYYY">{now}</Moment>
                                    <span>--</span>
                                    <Moment format="DD/MM/YYYY">{twoWeeksLater}</Moment>
                                    {sprint?.status === 'In Progress' && <div className='ml-4 text-xs font-semibold trackin-widest bg-green-700 text-white rounded px-2 py-1'>ACTIVE</div>}
                                </div>}
                            </div>
                            {sprint?.name !== 'Backlog' && <div className='flex flex-row gap-2 items-center'>
                                <div className='flex flex-row gap-2'>
                                    <div className='bg-blue-600 text-white rounded-full flex flex-row justify-center items-center w-4 h-4 lg:w-6 lg:h-6 text-xs font-bold'>{pendingPoints}</div>
                                    <div className='bg-green-600 text-white rounded-full flex flex-row justify-center items-center w-4 h-4 lg:w-6 lg:h-6 text-xs font-bold'>{donePoints}</div>
                                </div>

                                {
                                    activeSprint ? <>
                                        {activeSprint?.id === sprint?.id && <>

                                            {
                                                sprint?.status === 'In Progress' &&
                                                <button className='bg-blue-500 text-white px-4 py-1 text-sm rounded' onClick={() => setIsModalOpen(true)}>Complete Sprint</button>
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
                                    <div className='border bg-white px-4 py-1 text-sm rounded-md'>Completed</div>
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
                            <TaskItem t={t} key={t?.id} onSelectTask={() => onSelectTask(t?.id)} />
                        )) :
                        <div className='w-full border-2 border-dashed border-gray-300 p-2 rounded-md flex flex-row text-xs justify-center items-center text-gray-400 select-none'>No tickets yet...</div>
                }
            </div>
            <Modal title={`Complete Sprint`} isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); }}>
                <div className='flex flex-col gap-4 items-start'>
                    <p>There are still some pending tasks in this sprint, please select a sprint or backlog to move this tickets</p>
                    <select onChange={(e) => setNewSprintId(e.target.value)}>
                        {futureSprints?.map(fs => (
                            <option key={fs?.id} value={fs?.id}>{fs?.name}</option>
                        ))}
                    </select>
                    <button onClick={onCompleteSprint}>Save Changes</button>
                </div>
            </Modal>
        </div>
    )
}

export default SprintCard