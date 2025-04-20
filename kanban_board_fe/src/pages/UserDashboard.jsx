import React, { useEffect, useState, useCallback } from 'react';
import axios from '../api/axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskForm from '../components/TaskForm';


const UserDashboard = () => {
  const [tasks, setTasks] = useState({
    'To Do': [],
    'In Progress': [],
    'Completed': []
  });
  const userId = localStorage.getItem('userId');

  const fetchUserTasks = useCallback(async () => {
    try {
      const response = await axios.get(`/tasks/user/${userId}`);
      const organizedTasks = {
        'To Do': response.data.filter(task => task.status === 'To Do'),
        'In Progress': response.data.filter(task => task.status === 'In Progress'),
        'Completed': response.data.filter(task => task.status === 'Completed')
      };
      setTasks(organizedTasks);
    } catch (error) {
      console.error('Error fetching user tasks:', error);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserTasks();
  }, [fetchUserTasks]);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const task = tasks[source.droppableId][source.index];
    const updatedTasks = { ...tasks };
    updatedTasks[source.droppableId].splice(source.index, 1);
    updatedTasks[destination.droppableId].splice(destination.index, 0, task);

    setTasks(updatedTasks);

    try {
      await axios.put(`/tasks/${task._id}`, { status: destination.droppableId });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">User Dashboard</h2>
      <TaskForm fetchUserTasks={fetchUserTasks} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-4">
          {Object.keys(tasks).map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="bg-gray-100 p-4 rounded-lg min-h-[400px]">
                  <h3 className="text-xl font-semibold mb-4">{status}</h3>
                  {tasks[status].map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-4 rounded-lg shadow mb-2"
                        >
                          <h4 className="font-bold">{task.title}</h4>
                          <p>{task.description}</p>
                          <p className="text-sm text-gray-500">Deadline: {new Date(task.deadline).toLocaleString()}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default UserDashboard;
