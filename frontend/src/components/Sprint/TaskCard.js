import React from 'react';
import TaskIcon from '../Task/TaskIcon';
import Avatar from '../../shared/Avatar';

const TaskCard = ({ task }) => {
    return (
        <div className="bg-gray-50 rounded-lg p-4 shadow hover:shadow-md transition-shadow">
            <div>
                <div className='flex flex-row items-center gap-2'>
                    <TaskIcon type={task?.ticketType} />
                    <span>{task?.ticketNumber}</span>
                    <span className="ml-2 text-sm text-yellow-500 font-semibold">{task?.priority}</span>
                </div>
                <div className='py-4'>
                    {task?.title}
                </div>
                <div>
                    {task?.points}
                </div>
            </div>
            <div>
                {task?.assignee && <div className='flex flex-row gap-4'><Avatar size={'xs'} name={task?.assignee?.fullName} /><span>{task?.assignee?.fullName}</span></div>}
            </div>
        </div>
    );
};

export default TaskCard;
