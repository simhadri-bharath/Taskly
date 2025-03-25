import React, { useEffect, useState, useContext } from "react";
import axios from "../config/axios";
import { UserContext } from "../context/user.context"; // Import user context
import { useNavigate } from "react-router-dom"; // Import for navigation

const TaskTable = () => {
  const { user, setUser } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", completed: false });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({});

  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Initialize navigation hook

  useEffect(() => {
    const fetchUserAndTasks = async () => {
      try {
        if (!token) {
          console.log("No token found, redirecting to login...");
          navigate("/login");
          return;
        }

        // Fetch the logged-in user
        const userResponse = await axios.get("/api/user/loggeduser", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const loggedUser = userResponse.data.user;
        setUser(loggedUser); // Store user in context

        // Fetch tasks for the logged-in user
        const taskResponse = await axios.get("/api/task", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTasks(taskResponse.data); // Set tasks
      } catch (error) {
        console.error("Error fetching user or tasks:", error.response?.data || error.message);
      }
    };

    fetchUserAndTasks();
  }, [token, setUser, navigate]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setUser(null); // Clear user context
    navigate("/"); // Redirect to login page
  };

  // Handle New Task Input Changes
  const handleNewTaskChange = (e, field) => {
    setNewTask((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Handle Checkbox for New Task
  const handleNewTaskCheckbox = () => {
    setNewTask((prev) => ({ ...prev, completed: !prev.completed }));
  };

  // Create Task API Call
  const handleCreateTask = async () => {
    try {
      await axios.post(
        "/api/task",
        newTask,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsModalOpen(false); // Close modal after task creation
      window.location.reload(); // Refresh tasks after creation
    } catch (error) {
      console.error("Error creating task:", error.response?.data || error.message);
    }
  };

  // Handle edit button click
  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setEditedTask({ ...task });
  };

  // Handle input change for editing
  const handleInputChange = (e, field) => {
    const value = field === "completed" ? e.target.value === "true" : e.target.value;
    setEditedTask({ ...editedTask, [field]: value });
  };

  // Handle update task
  const handleUpdateTask = async () => {
    try {
      await axios.put(`/api/task/${editingTaskId}`, editedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(tasks.map(task => (task._id === editingTaskId ? { ...task, ...editedTask } : task)));
      setEditingTaskId(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating task:", error.response?.data || error.message);
    }
  };

  // Handle delete task
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/task/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      {/* Logout Button */}
      <div className="w-full max-w-4xl flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Display User Info */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-4">
        <h2 className="text-2xl font-bold text-white">Task List</h2>
        <p className="text-white">User: {user?.name}</p>
        <p className="text-white">Email: {user?.email}</p>
      </div>

      {/* Task Table */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700 text-white">
            <thead>
              <tr className="bg-gray-700">
                <th className="border border-gray-600 px-4 py-2">Title</th>
                <th className="border border-gray-600 px-4 py-2">Description</th>
                <th className="border border-gray-600 px-4 py-2">Completed</th>
                <th className="border border-gray-600 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="text-center bg-gray-700 hover:bg-gray-600">
                  <td className="border border-gray-600 px-4 py-2">
                    {editingTaskId === task._id ? (
                      <input
                        type="text"
                        value={editedTask.title}
                        onChange={(e) => handleInputChange(e, "title")}
                        className="bg-gray-500 text-white px-2 py-1 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                    ) : (
                      task.title
                    )}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {editingTaskId === task._id ? (
                      <input
                        type="text"
                        value={editedTask.description}
                        onChange={(e) => handleInputChange(e, "description")}
                        className="bg-gray-500 text-white px-2 py-1 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                    ) : (
                      task.description
                    )}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {editingTaskId === task._id ? (
                      <select
                        value={editedTask.completed}
                        onChange={(e) => handleInputChange(e, "completed")}
                        className="bg-gray-500 text-white px-2 py-1 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      >
                        <option value="true">✅ Yes</option>
                        <option value="false">❌ No</option>
                      </select>
                    ) : (
                      task.completed ? "✅ Yes" : "❌ No"
                    )}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {editingTaskId === task._id ? (
                      <button
                        onClick={handleUpdateTask}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(task)}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Button to Open Modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600"
      >
        + Create Task
      </button>

      {/* Task Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-white text-2xl hover:text-red-500"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>

            <h2 className="text-2xl text-white mb-4 text-center">Create Task</h2>

            {/* Task Title Input */}
            <input
              type="text"
              placeholder="Title"
              className="block w-full mb-2 p-2 border border-gray-600 rounded"
              onChange={(e) => handleNewTaskChange(e, "title")}
            />

            {/* Task Description Input */}
            <input
              type="text"
              placeholder="Description"
              className="block w-full mb-2 p-2 border border-gray-600 rounded"
              onChange={(e) => handleNewTaskChange(e, "description")}
            />

            {/* Task Completion Checkbox */}
            <label className="text-white flex items-center gap-2">
              <input
                type="checkbox"
                checked={newTask.completed}
                onChange={handleNewTaskCheckbox}
              />
              Completed
            </label>

            {/* Create Task Button */}
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded w-full hover:bg-blue-600"
              onClick={handleCreateTask}
            >
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTable;