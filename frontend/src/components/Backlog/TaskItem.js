import React from 'react';

const TaskItem = ({ task }) => {
    return (
        <div className="border-b last:border-none p-4 flex justify-between items-center">
            <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <div className="text-gray-500 text-sm">
                    <span className="mr-2">Priority: {task.priority}</span>
                    {task.tags && task.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-lg mr-2"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Task Actions */}
            <div className="flex space-x-4">
                <button className="text-gray-500 hover:text-gray-700">Assign to Sprint</button>
                <button className="text-blue-500 hover:text-blue-600">Edit</button>
            </div>
        </div>
    );
};

export default TaskItem;
