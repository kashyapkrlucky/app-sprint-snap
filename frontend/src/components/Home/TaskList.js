// components/TaskList.js
import React from 'react';
import TaskItem from '../Backlog/TaskItem';

const TaskList = ({ tasks }) => {
    return (
        <div className="w-full bg-white p-4 rounded-lg border">
            <h2 className="text-sm tracking-wide uppercase mb-4">Open Tasks</h2>
            <ul className="divide-y divide-gray-200">
                {tasks?.map((task, index) => (
                    <TaskItem t={task} key={task?.id}/>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
