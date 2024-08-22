import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_TASK_STATUS } from '../graphql/mutations'; // Import the mutation
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useAppSelection } from '../contexts/AppSelectionContext';

const TaskStatus = ({ taskId, currentStatus, type }) => {
    const { selectedProject } = useAppSelection();
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);
    const [isOpen, setIsOpen] = useState(false);
    const statuses = ['To Do', 'In Progress', 'Review', 'Done'];
    const statusColors = {
        'To Do': 'bg-gray-500',
        'In Progress': 'bg-blue-500',
        'Review': 'bg-purple-600',
        'Done': 'bg-green-600',
    };
    const statusColorsSmall = {
        'To Do': 'text-gray-600 bg-gray-100',
        'In Progress': 'text-blue-600 bg-blue-100',
        'Review': 'text-purple-600 bg-purple-100',
        'Done': 'text-green-600 bg-green-100',
    };
    const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS, {
        variables: { projectId: selectedProject?.id, skip: !selectedProject?.id },
    });
    const btnStyle = `flex items-center gap-2 justify-center w-full rounded-md shadow-sm px-4 py-2 text-sm text-white select-none font-medium text-gray-700 focus:outline-none ${statusColors[selectedStatus]}`;
    const btnStyleSmall = `flex items-center gap-1 justify-center w-full rounded-md shadow-sm px-2 py-0.5 text-xs uppercase select-none font-medium focus:outline-none ${statusColorsSmall[selectedStatus]}`;
    const handleStatusChange = async (newStatus) => {
        setSelectedStatus(newStatus);
        setIsOpen(false);

        try {
            await updateTaskStatus({
                variables: { taskId, status: newStatus },
            });
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    return (
        <div className="flex flex-row relative inline-block text-left">
            <div className='flex flex-row'>
                <button
                    type="button"
                    className={type === 'small' ? btnStyleSmall : btnStyle}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className='inline-block'>{selectedStatus}</span>
                    <ChevronDownIcon className='w-4' />
                </button>
            </div>

            {isOpen && (
                <div
                    className={`origin-top-right absolute left-0 z-10 ${type === 'small' ? 'mt-6' : 'mt-10'} w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                >
                    <div className="py-1" role="none">
                        {statuses.map((status) => (
                            <button
                                key={status}
                                className={`${status === selectedStatus
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700'
                                    } block px-4 py-2 text-sm w-full text-left hover:bg-gray-100`}
                                onClick={() => handleStatusChange(status)}
                                role="menuitem"
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskStatus;
