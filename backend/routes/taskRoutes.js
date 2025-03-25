import express from "express";
import * as taskController from "../controllers/taskController.js";
import checkUserAuth from '../middlewares/auth.js';

const router = express.Router();

// Use auth middleware and fetch tasks based on the logged-in user
router.get("/", checkUserAuth, taskController.getTasks);       // Get all tasks for a user
router.get("/task/:id", taskController.getTask);         // Get a single task
router.post("/", checkUserAuth,taskController.createTask);             // Create a new task
router.put("/:id",checkUserAuth, taskController.updateTask);           // Update a task
router.delete("/:id",checkUserAuth, taskController.deleteTask);        // Delete a task

export default router;
