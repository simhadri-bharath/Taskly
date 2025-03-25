import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // Reference to User
  });

  const TaskModel=mongoose.model("Task",taskSchema);
  export default TaskModel;