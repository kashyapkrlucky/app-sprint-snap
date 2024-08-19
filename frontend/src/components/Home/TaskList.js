// components/TaskList.js
import React from 'react';

const TaskList = ({ tasks }) => {
    return (
        <div className="w-full bg-white p-4 rounded-lg border">
            <h2 className="text-sm tracking-wide uppercase mb-4">Open Tasks</h2>
            <ul className="space-y-4">
                {tasks.map((task, index) => (
                    <li key={index} className="bg-gray-100 p-4 rounded-lg">
                        <p className="font-semibold">{task.title}</p>
                        <p className="text-gray-600">{task.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
