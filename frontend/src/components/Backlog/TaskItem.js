import React from 'react';
import TaskIcon from '../TaskIcon';
import Avatar from '../../shared/Avatar';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { NavLink } from "react-router-dom";
import TaskStatus from '../TaskStatus';

const TaskItem = ({ t, onSelectTask }) => {
    return (
        <div className='flex flex-row justify-between items-center bg-white p-2 first:rounded-t-lg last:rounded-b-lg cursor-pointer select-none'>
            <div className='flex flex-row items-center gap-3 w-full' onClick={() => onSelectTask(t?.id)}>
                <TaskIcon type={t?.ticketType} />
                <NavLink to={`/task/${t?.ticketNumber}`} className={(t?.status === 'Done') ? 'line-through text-gray-400' : ''}>{t?.ticketNumber}</NavLink>
                <span className='font-medium text-gray-700'>{t?.title}</span>
            </div>
            <div className='w-1/4 flex flex-row gap-2 justify-end items-center'>
                <TaskStatus taskId={t?.id} currentStatus={t?.status} type={'small'} />
                <span className='w-5 h-5 rounded-full text-xs font-bold bg-gray-100 flex flex-row items-center justify-center'>{t?.points > 0 ? t?.points : ''}</span>
                {(t?.assignee) ? <Avatar size={'xs'} name={t?.assignee?.fullName} /> : <UserCircleIcon className='w-6 h-6' title='Not assigned' />}
            </div>
        </div>
    );
};

export default TaskItem;
