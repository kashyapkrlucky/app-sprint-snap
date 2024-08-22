import { useQuery } from '@apollo/client';
import React from 'react'
import { GET_TASK } from '../../graphql/queries';
import TaskIcon from '../TaskIcon';
import { XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import TaskStatus from '../TaskStatus';

function TaskCard({ id, setCurrentTask }) {
    const { loading, error, data } = useQuery(GET_TASK, {
        variables: { id: id, skip: !id },
    });


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading sprints</p>;
    const task = data?.task;

    return (
        <div className='flex flex-col gap-4 px-4'>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between items-center gap-2 text-lg font-semibold text-gray-800">
                    <div className='flex flex-row items-center gap-2'>
                        <TaskIcon type={task?.ticketType} />
                        <span>{task?.ticketNumber}</span>
                        <span className="ml-2 text-sm text-yellow-500 font-semibold">{task?.priority}</span>
                    </div>
                    <div>
                        <button onClick={() => setCurrentTask('')}><XMarkIcon className='w-8 h-8' /></button>
                    </div>
                </div>
                <h1 className="text-xl font-bold text-gray-800">{task?.title}</h1>
            </div>
            <div className="flex flex-row gap-4 items-center text-sm">
                <TaskStatus taskId={task?.id} currentStatus={task?.status}/>
                {/* <button
                    className={`px-4 py-2 rounded-md ${task?.status === 'Completed'
                        ? 'bg-green-200 text-green-800'
                        : task?.status === 'In Progress'
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                >
                    {task?.status}
                </button> */}
            </div>
            <div className="mt-1 mb-1">
                <span className="text-sm font-medium text-gray-700">Sprints:</span>
                {task?.sprints.map(s => <span className="ml-2 text-sm text-gray-800" key={s?.id}>{s?.name}</span>)}
            </div>
            <div className="flex flex-col gap-2">
                <h4 className='font-bold'>Description</h4>
                <p>{task?.description}</p>
            </div>
        </div>
    )
}

export default TaskCard