import React from 'react';
import TaskIcon from '../Task/TaskIcon';
import Avatar from '../../shared/Avatar';
import TaskPriority from '../Task/TaskPriority';

const TaskCard = ({ task }) => {
    return (
        <div className="bg-gray-50 rounded-lg p-4 shadow hover:shadow-md transition-shadow">
            <div>
                <div className='flex flex-row items-center gap-2'>
                    <TaskIcon type={task?.ticketType} />
                    <span>{task?.ticketNumber}</span>
                    <TaskPriority type={task?.priority} />
                </div>
                <div className='py-4'>
                    {task?.title}
                </div>
                <div className='flex flex-row justify-between'>
                    <span className='w-4 h-4 lg:w-6 lg:h-6 bg-white border rounded-full flex flex-row justify-center items-center text-xs font-bold'>{task?.points} </span>
                    {task?.assignee && <div className='flex flex-row gap-2 items-center'>
                        <Avatar user={task?.assignee} size='sm'/>
                        {/* <span className='text-xs'>{task?.assignee?.fullName}</span> */}
                    </div>}
                </div>
            </div>

        </div>
    );
};

export default TaskCard;
