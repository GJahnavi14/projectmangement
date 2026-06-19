// routes/taskRoutes.js
// Defines all API routes for task management using Express Router

const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");

// Route: /tasks
router
  .route("/")
  .get(getAllTasks)   // GET  /tasks       → Fetch all tasks
  .post(createTask);  // POST /tasks       → Create a new task

// Route: /tasks/:id
router
  .route("/:id")
  .put(updateTaskStatus) // PUT    /tasks/:id  → Update task status
  .delete(deleteTask);   // DELETE /tasks/:id  → Delete a task

module.exports = router;
