import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import { GET_TASK_BY_NUMBER } from '../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import DateFromNow from '../shared/DateFromNow';
import TaskIcon from '../components/Task/TaskIcon';
import TaskComments from '../components/Task/TaskComments';
import Editable from '../components/Task/Editable';
import TaskStatus from '../components/Task/TaskStatus';
import { CREATE_COMMENT, UPDATE_TASK } from '../graphql/mutations';
import { AuthContext } from '../contexts/AuthContext';

const TaskDescriptionPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    console.log(user);
    
    const { loading, error, data } = useQuery(GET_TASK_BY_NUMBER, {
        variables: { ticketNumber: id, skip: !id },
    });

    const [updateTask] = useMutation(UPDATE_TASK, {
        refetchQueries: [{ query: GET_TASK_BY_NUMBER, variables: { ticketNumber: id, skip: !id } }]
    });
    const [createComment] = useMutation(CREATE_COMMENT, {
        refetchQueries: [{ query: GET_TASK_BY_NUMBER, variables: { ticketNumber: id, skip: !id } }]
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading projects in home</p>;

    const task = data?.taskByNumber;

    const updateValue = (name, value) => {
        updateTask({
            variables: {
                id: task?.id,
                [name]: value
            }
        })
    }

    const submitComment = (content) => {
        const payload = {
            content,
            task: task?.id,
            author: user?.id
        }
        createComment({
            variables: payload
        })
    }

    return (
        <Layout>
            <div className='flex flex-row gap-6 p-4'>
                <div className='w-3/4 flex flex-col gap-4 p-4'>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row items-center gap-2 text-lg font-semibold text-gray-800">
                            <TaskIcon type={task?.ticketType} />
                            <span>{task?.ticketNumber}</span>
                            <span className="ml-2 text-sm text-yellow-500 font-semibold">{task?.priority}</span>
                        </div>
                        <Editable type={'input'} name='title' value={task?.title} updateValue={updateValue} classes={'text-3xl font-bold text-gray-800'} />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-row gap-4 items-center text-sm">
                        <TaskStatus taskId={task?.id} currentStatus={task?.status} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <h4 className='font-bold'>Description</h4>
                        <Editable type={'textarea'} name='description' value={task?.description} updateValue={updateValue} />
                    </div>



                    {/* Comments Section */}
                    <div className="mt-4 mb-4">
                        <h2 className="text-lg font-semibold mb-4">Comments</h2>

                        <div className='flex flex-col gap-4 items-start'>
                            <TaskComments comments={task?.comments} submitComment={submitComment} />
                        </div>
                    </div>
                </div>
                <div className='w-1/4 flex flex-col gap-6 border-l p-6'>
                    <div className='flex flex-col gap-1'>
                        <h3 className='font-semibold text-sm'>People</h3>
                        <div className='flex flex-row gap-1'>
                            <span className='text-gray-600 w-24'>Assignee</span>
                            <div className='flex flex-row'>
                                {task?.assignee?.fullName && <span className='mr-4'>{task?.assignee?.fullName}</span>}
                                {(task?.assignee?.id !== task?.reporter?.id) && <button className='text-blue-600'>Assign to me</button>}
                            </div>
                        </div>
                        <div className='flex flex-row gap-1'>
                            <span className='text-gray-600 w-24'>Reporter</span>
                            {task?.reporter?.fullName}
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h3 className='font-semibold text-sm'>Dates</h3>
                        <div className='flex flex-row gap-1'>
                            <span className='text-gray-600 w-24'>Created</span>
                            <span className="ml-1"><DateFromNow value={task?.createdAt}></DateFromNow></span>
                        </div>
                        <div className='flex flex-row gap-1'>
                            <span className='text-gray-600 w-24'>Updated</span>
                            <span className="ml-1"><DateFromNow value={task?.updatedAt}></DateFromNow></span>
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <h3 className='font-medium text-sm'>Agile</h3>
                        <div className="mt-1 mb-1">
                            <span className="text-sm font-medium text-gray-700">Sprints:</span>
                            {task?.sprints.map(s => <span className="ml-2 text-sm text-gray-800" key={s?.id}>{s?.name}</span>)}
                        </div>
                    </div>

                    {/* Subtasks */}
                    {/* <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                    <h2 className="text-lg font-semibold mb-4">Subtasks</h2>
                    {task?.subtasks?.length > 0 ? (
                        <ul className="space-y-2">
                            {task?.subtasks?.map((subtask) => (
                                <li key={subtask?.id} className="text-gray-700">
                                    <span>{subtask?.title}</span>
                                    <span className={`ml-2 px-2 py-1 rounded-full text-sm ${subtask?.status === 'Completed'
                                        ? 'bg-green-200 text-green-800'
                                        : subtask?.status === 'In Progress'
                                            ? 'bg-yellow-200 text-yellow-800'
                                            : 'bg-gray-200 text-gray-800'
                                        }`}>
                                        {subtask?.status}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No subtasks.</p>
                    )}
                </div> */}

                    {/* Dependencies */}
                    {/* <div className="bg-white p-6 rounded-lg shadow-md mb-4">
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
                </div> */}

                    {/* Blocked By */}
                    {/* <div className="bg-white p-6 rounded-lg shadow-md mb-4">
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
                </div> */}

                    {/* Attachments */}
                    {/* <div className="bg-white p-6 rounded-lg shadow-md mb-4">
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
                </div> */}



                    {/* Activity Feed */}
                    {/* <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Activity Feed</h2>
                    <ul className="space-y-2">
                        {task.activityFeed.map((activity) => (
                            <li key={activity.id} className="text-gray-500">
                                {activity.date}: {activity.content}
                            </li>
                        ))}
                    </ul>
                </div> */}
                </div>
            </div>
        </Layout>
    );
};

export default TaskDescriptionPage;
