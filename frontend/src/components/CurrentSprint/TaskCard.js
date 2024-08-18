import React from 'react';

const TaskCard = ({ task }) => {
    return (
        <div className="bg-gray-50 rounded-lg p-4 shadow hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
            <p className="text-sm text-gray-500 mb-2">Assigned to: {task.assignee}</p>
            <div className="text-sm">
                <span
                    className={`inline-block px-3 py-1 rounded-full text-white ${task.priority === 'High'
                            ? 'bg-red-500'
                            : task.priority === 'Medium'
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                        }`}
                >
                    {task.priority} Priority
                </span>
            </div>
        </div>
    );
};

export default TaskCard;
