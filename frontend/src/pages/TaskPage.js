import React from 'react';
import Layout from '../components/Layout';

const TaskDescriptionPage = () => {
    const task = {
        id: "1",
        title: "Implement User Authentication",
        description: "Add authentication to the app using JWT and OAuth.",
        status: "In Progress",
        priority: "High",
        dueDate: "2024-08-25T00:00:00Z",
        assignee: {
            id: "2",
            name: "John Doe",
        },
        subtasks: [
            {
                id: "6",
                title: "Design Login Page",
                status: "Completed",
            },
            {
                id: "7",
                title: "Set Up OAuth Providers",
                status: "In Progress",
            },
        ],
        dependencies: [
            {
                id: "3",
                title: "Set Up Database",
                status: "Completed",
            },
            {
                id: "4",
                title: "Create User Models",
                status: "In Progress",
            },
        ],
        blockedBy: [
            {
                id: "5",
                title: "Finalize API Contracts",
                status: "To Do",
            },
        ],
        attachments: [
            {
                id: "8",
                name: "API_Documentation.pdf",
                type: "PDF",
                url: "https://example.com/docs/API_Documentation.pdf",
            },
            {
                id: "9",
                name: "OAuth_Configuration.png",
                type: "Image",
                url: "https://example.com/images/OAuth_Configuration.png",
            },
        ],
        comments: [
            {
                id: "1",
                author: "Jane Doe",
                content: "Don't forget to include refresh tokens.",
                date: "2024-08-18",
            },
            {
                id: "2",
                author: "John Doe",
                content: "I've started working on the OAuth part.",
                date: "2024-08-19",
            },
        ],
        activityFeed: [
            {
                id: "10",
                content: "Status changed from 'To Do' to 'In Progress'",
                date: "2024-08-18",
            },
            {
                id: "11",
                content: "Subtask 'Set Up OAuth Providers' marked as 'In Progress'",
                date: "2024-08-19",
            },
        ],
    };

    return (
        <Layout>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{task.title}</h1>
                    <span
                        className={`px-3 py-1 rounded-full text-sm ${task.status === 'Completed'
                                ? 'bg-green-200 text-green-800'
                                : task.status === 'In Progress'
                                    ? 'bg-yellow-200 text-yellow-800'
                                    : 'bg-gray-200 text-gray-800'
                            }`}
                    >
                        {task.status}
                    </span>
                </div>
                {/* Action Buttons */}
                <div className="space-x-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        Edit Task
                    </button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded">
                        Mark as Completed
                    </button>
                </div>
            </div>

            {/* Task Details */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                <h2 className="text-lg font-semibold mb-4">Task Details</h2>
                <p className="text-gray-700 mb-2">
                    <strong>Description:</strong> {task.description}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Priority:</strong> {task.priority}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Assignee:</strong> {task.assignee.name}
                </p>
            </div>

            {/* Subtasks */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                <h2 className="text-lg font-semibold mb-4">Subtasks</h2>
                {task.subtasks.length > 0 ? (
                    <ul className="space-y-2">
                        {task.subtasks.map((subtask) => (
                            <li key={subtask.id} className="text-gray-700">
                                <span>{subtask.title}</span>
                                <span className={`ml-2 px-2 py-1 rounded-full text-sm ${subtask.status === 'Completed'
                                        ? 'bg-green-200 text-green-800'
                                        : subtask.status === 'In Progress'
                                            ? 'bg-yellow-200 text-yellow-800'
                                            : 'bg-gray-200 text-gray-800'
                                    }`}>
                                    {subtask.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No subtasks.</p>
                )}
            </div>

            {/* Dependencies */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                <h2 className="text-lg font-semibold mb-4">Dependencies</h2>
                {task.dependencies.length > 0 ? (
                    <ul className="space-y-2">
                        {task.dependencies.map((dep) => (
                            <li key={dep.id} className="text-gray-700">
                                {dep.title} ({dep.status})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No dependencies.</p>
                )}
            </div>

            {/* Blocked By */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                <h2 className="text-lg font-semibold mb-4">Blocked By</h2>
                {task.blockedBy.length > 0 ? (
                    <ul className="space-y-2">
                        {task.blockedBy.map((block) => (
                            <li key={block.id} className="text-gray-700">
                                {block.title} ({block.status})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No blocking tasks.</p>
                )}
            </div>

            {/* Attachments */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                <h2 className="text-lg font-semibold mb-4">Attachments</h2>
                {task.attachments.length > 0 ? (
                    <ul className="space-y-2">
                        {task.attachments.map((attachment) => (
                            <li key={attachment.id} className="text-blue-500">
                                <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                                    {attachment.name} ({attachment.type})
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No attachments.</p>
                )}
            </div>

            {/* Comments Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                <h2 className="text-lg font-semibold mb-4">Comments</h2>
                <ul className="space-y-4 mb-4">
                    {task.comments.map((comment) => (
                        <li key={comment.id} className="border-b border-gray-200 pb-2">
                            <p className="text-sm text-gray-500">{comment.author} - {comment.date}</p>
                            <p className="text-gray-700">{comment.content}</p>
                        </li>
                    ))}
                </ul>
                {/* Comment Form */}
                <form>
                    <textarea
                        className="w-full p-3 border rounded-lg mb-4"
                        placeholder="Add a comment..."
                    ></textarea>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                </form>
            </div>

            {/* Activity Feed */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Activity Feed</h2>
                <ul className="space-y-2">
                    {task.activityFeed.map((activity) => (
                        <li key={activity.id} className="text-gray-500">
                            {activity.date}: {activity.content}
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
};

export default TaskDescriptionPage;
