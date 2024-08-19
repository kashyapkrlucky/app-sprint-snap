import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ title }) => {
    const tasks = [
        // Mock Data
        { id: 1, title: 'Create user login flow', priority: 'High', tags: ['User', 'Authentication'] },
        { id: 2, title: 'Implement search functionality', priority: 'Medium', tags: ['Feature'] },
        { id: 3, title: 'Fix UI bugs on the homepage', priority: 'Low', tags: ['UI', 'Bug'] },
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm p-3">
            {tasks.length ? (
                tasks.map((task) => <TaskItem key={task.id} task={task} />)
            ) : (
                <div className="p-4 text-gray-500">No tasks in backlog</div>
            )}
        </div>
    );
};

export default TaskList;
