import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
} from "react-beautiful-dnd";

type Task = {
  id: string;
  title: string;
  description: string;
};

type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

type KanbanData = {
  columns: Record<string, Column>;
  tasks: Record<string, Task>;
};

const initialData: KanbanData = {
  columns: {
    todo: {
      id: "todo",
      title: "To Do",
      taskIds: ["task-1", "task-2", "task-3"],
    },
    progress: {
      id: "progress",
      title: "Progress",
      taskIds: ["task-4", "task-5"],
    },
    done: {
      id: "done",
      title: "Done",
      taskIds: ["task-6", "task-7"],
    },
  },
  tasks: {
    "task-1": { id: "task-1", title: "Task 1", description: "Description 1" },
    "task-2": { id: "task-2", title: "Task 2", description: "Description 2" },
    "task-3": { id: "task-3", title: "Task 3", description: "Description 3" },
    "task-4": { id: "task-4", title: "Task 4", description: "Description 4" },
    "task-5": { id: "task-5", title: "Task 5", description: "Description 5" },
    "task-6": { id: "task-6", title: "Task 6", description: "Description 6" },
    "task-7": { id: "task-7", title: "Task 7", description: "Description 7" },
  },
};

export default function KanbanBoard() {
  const [data, setData] = useState<KanbanData>(initialData);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const sourceColumn = data.columns[result.source.droppableId];
    const destinationColumn = data.columns[result.destination.droppableId];

    if (sourceColumn === destinationColumn) {
      const newTaskIds = Array.from(sourceColumn.taskIds);
      newTaskIds.splice(result.source.index, 1);
      newTaskIds.splice(result.destination.index, 0, result.draggableId);

      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds,
      };

      const newData: KanbanData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newData);
    } else {
      const sourceTaskIds = Array.from(sourceColumn.taskIds);
      const destinationTaskIds = Array.from(destinationColumn.taskIds);

      const [task] = sourceTaskIds.splice(result.source.index, 1);
      destinationTaskIds.splice(result.destination.index, 0, task);

      const newSourceColumn = {
        ...sourceColumn,
        taskIds: sourceTaskIds,
      };

      const newDestinationColumn = {
        ...destinationColumn,
        taskIds: destinationTaskIds,
      };

      const newData: KanbanData = {
        ...data,
        columns: {
          ...data.columns,
          [newSourceColumn.id]: newSourceColumn,
          [newDestinationColumn.id]: newDestinationColumn,
        },
      };

      setData(newData);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {Object.values(data.columns).map((column) => (
        <Droppable droppableId={column.id} key={column.id}>
          {(provided: DroppableProvided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="w-[25%] h-full p-4 border border-black bg-red-700 rounded-lg"
            >
              <h3 className="font-bold text-white">{column.title}</h3>
              <div className="h-[80%] border border-green-800 p-2 rounded mt-2 bg-white">
                {column.taskIds.map((taskId, index) => {
                  const task = data.tasks[taskId];
                  return (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided: DraggableProvided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="border border-black p-2 rounded m-2"
                        >
                          <h1 className="text-lg font-semibold">{task.title}</h1>
                          <p className="text-sm">{task.description}</p>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
}
