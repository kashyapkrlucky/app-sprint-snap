import React from 'react';

const SprintSummary = () => {
    const tasks = {
        total: 10,
        toDo: 3,
        inProgress: 4,
        done: 3,
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mt-4">
            <h3 className="text-lg font-semibold">Sprint Summary</h3>
            <p>Total Tasks: {tasks.total}</p>
            <p>To Do: {tasks.toDo}</p>
            <p>In Progress: {tasks.inProgress}</p>
            <p>Done: {tasks.done}</p>
        </div>
    );
};

export default SprintSummary;
