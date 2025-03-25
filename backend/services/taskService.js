import TaskModel from "../models/Task.js";
import UserModel from "../models/User.js";
export const getAllTasks = async (userId) => {
  return await TaskModel.find({ user: userId }).populate("user", "name email");
};

export const getTaskById = async (taskId) => {
  return await TaskModel.findById(taskId).populate("user", "name email");
};

export const createTask = async (taskData) => {
    try {
      // Extract userId from taskData
      const { userId, title, description, completed } = taskData;
  
      // Ensure userId is provided
      if (!userId) {
        throw new Error("User ID is required");
      }
  
      // Find the user in the database
      const existingUser = await UserModel.findById(userId);
      if (!existingUser) {
        throw new Error("User not found");
      }
  
      // Create a new task and associate it with the user
      const newTask = new TaskModel({ title, description, completed, user: existingUser._id });
      
      // Save the task to the database
      const savedTask = await newTask.save();
  
      return savedTask;
    } catch (error) {
      throw new Error(error.message);
    }
  };

export const updateTask = async (taskId, updatedData) => {
  return await TaskModel.findByIdAndUpdate(taskId, updatedData, { new: true });
};

export const deleteTask = async (taskId) => {
  return await TaskModel.findByIdAndDelete(taskId);
};
