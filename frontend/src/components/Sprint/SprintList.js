import React, { useState } from 'react';

const SprintList = ({ sprints }) => {
    const [expandedSprintId, setExpandedSprintId] = useState(null);

    const toggleSprintTasks = (sprintId) => {
        setExpandedSprintId(expandedSprintId === sprintId ? null : sprintId);
    };

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sprints</h2>
            <div className="space-y-6">
                {sprints.map((sprint) => (
                    <div
                        key={sprint?.id}
                        className="bg-white rounded-lg shadow-lg p-6 transition-shadow hover:shadow-xl"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{sprint.name}</h3>
                                <p className="text-sm text-gray-600">
                                    Start Date: {new Date(sprint.startDate).toLocaleDateString()} | End Date: {new Date(sprint.endDate).toLocaleDateString()}
                                </p>
                            </div>
                            <button
                                onClick={() => toggleSprintTasks(sprint?.id)}
                                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                            >
                                {expandedSprintId === sprint?.id ? 'Hide Tasks' : 'Show Tasks'}
                            </button>
                        </div>
                        {expandedSprintId === sprint?.id && (
                            <div className="mt-4">
                                <h4 className="text-lg font-semibold text-gray-700 mb-2">Tasks</h4>
                                <ul className="space-y-3">
                                    {sprint.tasks.map((task) => (
                                        <li
                                            key={task?.id}
                                            className="flex justify-between bg-gray-100 rounded-lg p-3 shadow-sm"
                                        >
                                            <div>
                                                <h5 className="font-medium text-gray-800">{task?.title}</h5>
                                                <p className="text-xs text-gray-500">Status: {task?.status}</p>
                                            </div>
                                            <p className="text-xs text-gray-500">Assignee: {task?.assignee?.fullName}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SprintList;
