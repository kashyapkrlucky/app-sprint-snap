import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const TaskBoard = () => {
  // Sample data
  const initialTasks = {
    toDo: [
      { id: '1', title: 'Implement login flow', assignee: 'Alice', priority: 'High' },
      { id: '2', title: 'Setup OAuth2', assignee: 'Bob', priority: 'Medium' },
    ],
    inProgress: [
      { id: '3', title: 'Fix profile image bug', assignee: 'Charlie', priority: 'High' },
    ],
    done: [
      { id: '4', title: 'Update UI for dashboard', assignee: 'Dave', priority: 'Low' },
    ],
  };

  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
  const { destination, source, draggableId } = result;

  if (!destination) return;

  // Check if the task has unmet dependencies
  const task = tasks[source.droppableId].find(t => t.id === draggableId);

  const unmetDependencies = task?.dependencies?.filter(depId => {
    // Find the dependent task and check if it is done
    const depTask = Object.values(tasks).flat().find(t => t.id === depId);
    return depTask.status !== 'done';
  });

  if (unmetDependencies?.length > 0) {
    alert('Task cannot be moved until its dependencies are completed.');
    return;
  }

  // Proceed with moving task if no unmet dependencies
  const sourceColumn = tasks[source.droppableId];
  const destinationColumn = tasks[destination.droppableId];

  const [movedTask] = sourceColumn.splice(source.index, 1);
  destinationColumn.splice(destination.index, 0, movedTask);

  setTasks({
    ...tasks,
    [source.droppableId]: sourceColumn,
    [destination.droppableId]: destinationColumn,
  });
};


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4">
        {/* To Do Column */}
        <Droppable droppableId="toDo">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-1/3 bg-white rounded-lg shadow p-4"
            >
              <h2 className="text-lg font-semibold mb-4">To Do</h2>
              {tasks.toDo.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-4"
                    >
                      <TaskCard task={task} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* In Progress Column */}
        <Droppable droppableId="inProgress">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-1/3 bg-white rounded-lg shadow p-4"
            >
              <h2 className="text-lg font-semibold mb-4">In Progress</h2>
              {tasks.inProgress.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-4"
                    >
                      <TaskCard task={task} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Done Column */}
        <Droppable droppableId="done">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-1/3 bg-white rounded-lg shadow p-4"
            >
              <h2 className="text-lg font-semibold mb-4">Done</h2>
              {tasks.done.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-4"
                    >
                      <TaskCard task={task} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
