import * as taskService from '../services/taskService.js';
export const getTasks = async (req, res) => {
  try {
    // Use req.user._id from the middleware instead of req.params.userId
    const tasks = await taskService.getAllTasks(req.user._id);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error: error.message });
  }
};


  export const getTask = async (req, res) => {
    try {
      const task = await taskService.getTaskById(req.params.id);
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: "Error fetching task", error });
    }
  };

  export const createTask = async (req, res) => {
    try {
        // Extract user ID from the authenticated user (set by checkUserAuth middleware)
        const userId = req.user._id; 

        // Add userId to the task data
        const taskData = { ...req.body, userId };

        // Pass updated task data to the service
        const task = await taskService.createTask(taskData);

        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: "Error creating task", error });
    }
};


  export const updateTask = async (req, res) => {
    try {
      const task = await taskService.updateTask(req.params.id, req.body);
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: "Error updating task", error });
    }
  };

  export const deleteTask = async (req, res) => {
    try {
      const task = await taskService.deleteTask(req.params.id);
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting task", error });
    }
  };