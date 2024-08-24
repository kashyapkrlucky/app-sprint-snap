import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const TaskBoard = ({ list, updateTaskStatus }) => {
  const [tasks, setTasks] = useState(list);

  

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    const sIndex = tasks?.findIndex(t => t?.id === source.droppableId);
    const sourceColumn = tasks[sIndex];
    const dIndex = tasks?.findIndex(t => t?.id === destination.droppableId);
    const destinationColumn = tasks[dIndex];
    const [movedTask] = sourceColumn?.list?.splice(source.index, 1);
    destinationColumn?.list?.splice(destination.index, 0, movedTask);
    const items = [...tasks];
    items[sIndex] = sourceColumn;
    items[dIndex] = destinationColumn;

    setTasks([...items]);

    updateTaskStatus({
      variables: {
        taskId: movedTask?.id, status: destinationColumn?.name
      }
    })
  };


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4">
        {
          list?.map(l => (
            <Droppable droppableId={l?.id} key={l?.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="w-1/3 bg-white rounded-lg shadow p-4"
                >
                  <h2 className="text-lg font-semibold mb-4">{l?.name}</h2>
                  {l?.list?.map((task, index) => (
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
          ))
        }

      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
