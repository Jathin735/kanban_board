import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
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
    const normalUsers = response.data.filter((user) => user.role !== 'admin');
    setUsers(normalUsers);
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
    <>
    <Navbar/>
    <div className="container">
      <h2>Admin Dashboard</h2>

      {!selectedUser ? (
        <div>
          <h3 className="text-xl font-semibold mb-4">Select a User</h3>
          <div className="flex flex-wrap gap-4">
            {users.map((user) => (
              <button
                key={user._id}
                onClick={() => handleUserSelection(user)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all duration-300">
                {user.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <button
            onClick={() => setSelectedUser(null)}
            className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded mb-6"
          >
            ← Back to User List
          </button>

          <h3 className="text-2xl font-bold mb-4">{selectedUser.name}'s Task Board</h3>

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Assign a New Task</h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Task Title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="input w-full"
              />
              <button
                onClick={handleAssignTask}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Assign
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">Tasks</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <div key={task._id} className="task-card">
                  <h4>{task.title}</h4>
                  <p>Status: <span className="text-blue-600 font-medium">{task.status}</span></p>
                </div>
              ))}
              {tasks.length === 0 && <p>No tasks assigned yet.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default AdminDashboard;
