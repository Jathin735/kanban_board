import React, { useEffect, useState } from 'react';
import axios from 'axios';


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchUserTasks = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tasks/user/${userId}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    fetchUserTasks(user._id);
  };

  const handleAssignTask = async () => {
    if (!selectedUser || !taskTitle.trim()) {
      return alert('Please fill all fields');
    }

    try {
      await axios.post('http://localhost:5000/api/tasks', {
        title: taskTitle,
        assignedTo: selectedUser._id,
        status: 'To Do'
      });
      alert('Task assigned successfully');
      setTaskTitle('');
      fetchUserTasks(selectedUser._id);
    } catch (error) {
      console.error('Error assigning task:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>

      {!selectedUser ? (
        <div>
          <h3 className="text-xl font-semibold mb-2">Select a User</h3>
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                <button onClick={() => handleUserSelection(user)} className="text-blue-500 underline">
                  {user.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <button onClick={() => setSelectedUser(null)} className="text-red-500 mb-4">Back to User List</button>
          <h3 className="text-xl font-semibold mb-2">{selectedUser.name}'s Board</h3>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Assign Task</h3>
            <input
              type="text"
              placeholder="Task Title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="border p-2 rounded mr-2"
            />
            <button
              onClick={handleAssignTask}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Assign Task
            </button>
          </div>

          <h3 className="text-xl font-semibold mb-2">Tasks</h3>
          <ul className="list-disc pl-5">
            {tasks.map((task) => (
              <li key={task._id}>
                <span className="font-semibold">{task.title}</span> - {task.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;