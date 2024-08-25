import React from 'react';
import TaskIcon from '../Task/TaskIcon';
import Avatar from '../../shared/Avatar';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { NavLink } from "react-router-dom";

const TaskItem = ({ t, onSelectTask, provided }) => {
    const statusColorsSmall = {
        'To Do': 'text-gray-600 bg-gray-100',
        'In Progress': 'text-blue-600 bg-blue-100',
        'Review': 'text-purple-600 bg-purple-100',
        'Done': 'text-green-600 bg-green-100',
    };
    const btnStyleSmall = `inline-block rounded-md shadow-sm px-2 py-0.5 text-xs uppercase select-none font-medium focus:outline-none ${statusColorsSmall[t?.status]}`;

    return (
        <div className='flex flex-row justify-between items-center bg-white p-2 first:rounded-t-lg last:rounded-b-lg cursor-pointer select-none' ref={provided?.innerRef}
        {...provided?.draggableProps}
        {...provided?.dragHandleProps}>
            <div className='flex flex-row items-center gap-3 w-full text-xs lg:text-base' onClick={() => onSelectTask(t?.id)}>
                <TaskIcon type={t?.ticketType} />
                <NavLink to={`/task/${t?.ticketNumber}`} className={(t?.status === 'Done') ? 'line-through text-gray-400' : ''}>{t?.ticketNumber}</NavLink>
                <span className='font-medium text-gray-700'>{t?.title}</span>
            </div>
            <div className='w-1/4 flex flex-row gap-2 justify-end items-center'>
                <span className={btnStyleSmall}>{t?.status}</span>
                <span className='w-5 h-5 rounded-full text-xs font-bold bg-gray-100 flex flex-row items-center justify-center'>{t?.points > 0 ? t?.points : ''}</span>
                {(t?.assignee) ? <Avatar user={t?.assignee} size='xs'/> : <UserCircleIcon className='w-6 h-6' title='Not assigned' />}
            </div>
        </div>
    );
};

export default TaskItem;
