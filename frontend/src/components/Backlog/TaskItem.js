import React from 'react';
import TaskIcon from '../TaskIcon';
import Avatar from '../../shared/Avatar';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { NavLink } from "react-router-dom";

const TaskItem = ({ t, onSelectTask }) => {
    return (
        <div className='flex flex-row justify-between items-center bg-white p-2 first:rounded-t-lg last:rounded-b-lg cursor-pointer select-none'>
            <div className='flex flex-row items-center gap-3 w-full' onClick={() => onSelectTask(t?.id)}>
                <TaskIcon type={t?.ticketType} />
                <NavLink to={`/task/${t?.ticketNumber}`} className={(t?.status === 'Done') ? 'line-through text-gray-400' : ''}>{t?.ticketNumber}</NavLink>
                <span className='font-medium text-gray-700'>{t?.title}</span>
            </div>
            <div className='w-auto'>
                {(t?.assignee || t?.reporter) ? <Avatar size={'xs'} name={t?.assignee?.fullName || t?.reporter?.fullName} /> : <UserCircleIcon className='w-6 h-6' title='Not assigned' />}
            </div>
        </div>
    );
};

export default TaskItem;
