// services/api.js
// Centralised Axios instance and API helper functions

import axios from "axios";

// Base URL points to the Express backend
const BASE_URL = "http://localhost:5000";

// Create an Axios instance with default configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10-second timeout
});

// ─── Task API Functions ────────────────────────────────────────────────────────

/**
 * Fetch all tasks from the backend.
 * @returns {Promise} Axios response
 */
export const fetchTasks = () => api.get("/tasks");

/**
 * Create a new task.
 * @param {Object} taskData - { title, description, status }
 * @returns {Promise} Axios response
 */
export const createTask = (taskData) => api.post("/tasks", taskData);

/**
 * Update the status of an existing task.
 * @param {string} id - Task MongoDB ObjectId
 * @param {string} status - New status value
 * @returns {Promise} Axios response
 */
export const updateTaskStatus = (id, status) =>
  api.put(`/tasks/${id}`, { status });

/**
 * Delete a task by its ID.
 * @param {string} id - Task MongoDB ObjectId
 * @returns {Promise} Axios response
 */
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;
