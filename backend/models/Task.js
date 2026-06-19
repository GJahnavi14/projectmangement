// models/Task.js
// Mongoose schema and model for a Task

const mongoose = require("mongoose");

/**
 * Task Schema
 * Defines the structure and validation rules for a task document in MongoDB.
 */
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Task description is required"],
      minlength: [20, "Description must be at least 20 characters"],
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["Pending", "In Progress", "Completed"],
        message: "Status must be Pending, In Progress, or Completed",
      },
      default: "Pending",
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Automatically manage createdAt and updatedAt timestamps
    timestamps: false,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
