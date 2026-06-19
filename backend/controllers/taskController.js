// controllers/taskController.js
// Contains all business logic for task CRUD operations

const Task = require("../models/Task");

/**
 * @desc    Get all tasks
 * @route   GET /tasks
 * @access  Public
 */
const getAllTasks = async (req, res) => {
  try {
    // Fetch all tasks, sorted by newest first
    const tasks = await Task.find().sort({ created_at: -1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Could not fetch tasks",
      error: error.message,
    });
  }
};

/**
 * @desc    Create a new task
 * @route   POST /tasks
 * @access  Public
 */
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    // Create and save the new task
    const task = await Task.create({ title, description, status });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error: Could not create task",
      error: error.message,
    });
  }
};

/**
 * @desc    Update a task's status
 * @route   PUT /tasks/:id
 * @access  Public
 */
const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status value
    const allowedStatuses = ["Pending", "In Progress", "Completed"];
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "A valid status (Pending, In Progress, Completed) is required",
      });
    }

    // Find the task and update its status
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true } // Return updated doc and run schema validators
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      data: task,
    });
  } catch (error) {
    // Handle invalid MongoDB ObjectId
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error: Could not update task",
      error: error.message,
    });
  }
};

/**
 * @desc    Delete a task
 * @route   DELETE /tasks/:id
 * @access  Public
 */
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    // Handle invalid MongoDB ObjectId
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error: Could not delete task",
      error: error.message,
    });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
};
