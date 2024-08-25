import { useMutation, useQuery } from '@apollo/client';
import React, { useContext } from 'react'
import { GET_SPRINTS_WITH_TASKS, GET_TASK } from '../../graphql/queries';
import TaskIcon from '../Task/TaskIcon';
import { XMarkIcon } from '@heroicons/react/24/outline';
import TaskStatus from '../Task/TaskStatus';
import DateFromNow from '../../shared/DateFromNow';
import Editable from '../Task/Editable';
import { CREATE_COMMENT, UPDATE_TASK } from '../../graphql/mutations';
import { useAppSelection } from '../../contexts/AppSelectionContext';
import TaskAssignee from '../Task/TaskAssignee';
import EditableNum from '../Task/EditableNum';
import TaskComments from '../Task/TaskComments';
import { AuthContext } from '../../contexts/AuthContext';
import TaskPriority from '../Task/TaskPriority';

function TaskInPane({ id, setCurrentTask }) {
    const { selectedProject } = useAppSelection();
    const { loading, error, data } = useQuery(GET_TASK, {
        variables: { id: id, skip: !id },
    });

    const { user } = useContext(AuthContext);

    const [updateTask] = useMutation(UPDATE_TASK, {
        refetchQueries: [{ query: GET_SPRINTS_WITH_TASKS, variables: { projectId: selectedProject?.id } }]
    });
    const [createComment] = useMutation(CREATE_COMMENT, {
        refetchQueries: [{ query: GET_TASK, variables: { id: id, skip: !id } }]
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading sprints</p>;
    const task = data?.task;

    const updateValue = (name, value) => {
        updateTask({
            variables: {
                id: task?.id,
                [name]: value
            }
        })
    }

    return (
        <div className='flex flex-col gap-4 px-4'>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between items-center gap-2 text-lg font-semibold text-gray-800">
                    <div className='flex flex-row items-center gap-2'>
                        <TaskIcon type={task?.ticketType} />
                        <span>{task?.ticketNumber}</span>
                        <TaskPriority type={task?.priority}/>
                    </div>
                    <div>
                        <button onClick={() => setCurrentTask('')}><XMarkIcon className='w-8 h-8' /></button>
                    </div>
                </div>
                <Editable type={'input'} name='title' value={task?.title} updateValue={updateValue} classes={'text-xl font-bold text-gray-800'} />
            </div>
            <div className="flex flex-row gap-4 items-center text-sm">
                <TaskStatus taskId={task?.id} currentStatus={task?.status} />
            </div>
            <div className="mt-1 mb-1">
                <span className="text-sm font-medium text-gray-700">Sprints:</span>
                {task?.sprints.map(s => <span className="ml-2 text-sm text-gray-800" key={s?.id}>{s?.name}</span>)}
            </div>
            <div className="flex flex-col gap-2">
                <h4 className='font-bold'>Points</h4>
                <EditableNum name='points' value={task?.points || 0} updateValue={updateValue} />
            </div>
            <div className="flex flex-col gap-2">
                <h4 className='font-bold'>Description</h4>
                <Editable type={'textarea'} name='description' value={task?.description} updateValue={updateValue} />
            </div>
            <div className='flex flex-col gap-1'>
                <h3 className='font-semibold text-sm'>People</h3>
                <div className='flex flex-row gap-1'>
                    <span className='text-gray-600 w-24'>Assignee</span>
                    <TaskAssignee name='assignee' value={task?.assignee} updateValue={updateValue} />
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

            <TaskComments task={task} user={user} comments={task?.comments} createComment={createComment} />
        </div>
    )
}

export default TaskInPane