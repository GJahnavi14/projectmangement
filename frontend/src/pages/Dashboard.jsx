// pages/Dashboard.jsx — Main task dashboard with filters

import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import TaskCard  from "../components/TaskCard";
import Loader    from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { fetchTasks, updateTaskStatus, deleteTask } from "../services/api";

const FILTERS = ["All", "Pending", "In Progress", "Completed"];

const Dashboard = () => {
  const [tasks,        setTasks]        = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [toast,        setToast]        = useState(null);

  // ── Load tasks ──────────────────────────────────────────────────────────────
  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchTasks();
      setTasks(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  // ── Toast ───────────────────────────────────────────────────────────────────
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  };

  // ── Actions ─────────────────────────────────────────────────────────────────
  const handleComplete = async (id) => {
    try {
      await updateTaskStatus(id, "Completed");
      setTasks((prev) => prev.map((t) => t._id === id ? { ...t, status: "Completed" } : t));
      showToast("🎉 Task marked as completed!");
    } catch (err) {
      showToast(err.response?.data?.message || "Could not update task.", "danger");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      showToast("🗑️ Task deleted.");
    } catch (err) {
      showToast(err.response?.data?.message || "Could not delete task.", "danger");
    }
  };

  // ── Filtered tasks & counts ─────────────────────────────────────────────────
  const filtered = activeFilter === "All"
    ? tasks
    : tasks.filter((t) => t.status === activeFilter);

  const count = (s) => s === "All" ? tasks.length : tasks.filter((t) => t.status === s).length;

  const filterBtnClass = (f) => {
    if (f === "All")         return "f-all";
    if (f === "Pending")     return "f-pending";
    if (f === "In Progress") return "f-progress";
    return "f-done";
  };

  return (
    <div>

      {/* ── Toast ── */}
      {toast && (
        <div className={`toast-custom ${toast.type === "success" ? "toast-success" : "toast-danger"}`}>
          {toast.message}
          <button className="toast-close" onClick={() => setToast(null)} aria-label="Close">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      )}

      {/* ── Hero header ── */}
      <div className="page-hero d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div>
          <h1 className="mb-1">
            <span className="hero-gradient-text">Project Dashboard</span>
          </h1>
          <p className="mb-0">
            {loading ? "Loading..." : `${tasks.length} task${tasks.length !== 1 ? "s" : ""} in your workspace`}
          </p>
        </div>
        <Link to="/add-task" className="btn-add-task">
          <i className="bi bi-plus-lg"></i>
          New Task
        </Link>
      </div>

      {/* ── Stats strip ── */}
      {!loading && !error && (
        <div className="stats-strip">
          <div className="stat-pill all">
            <i className="bi bi-stack"></i>
            All Tasks &nbsp;<strong>{count("All")}</strong>
          </div>
          <div className="stat-pill pending">
            <i className="bi bi-clock-fill"></i>
            Pending &nbsp;<strong>{count("Pending")}</strong>
          </div>
          <div className="stat-pill progress">
            <i className="bi bi-lightning-charge-fill"></i>
            In Progress &nbsp;<strong>{count("In Progress")}</strong>
          </div>
          <div className="stat-pill done">
            <i className="bi bi-check-circle-fill"></i>
            Completed &nbsp;<strong>{count("Completed")}</strong>
          </div>
        </div>
      )}

      {/* ── Filter bar ── */}
      {!loading && !error && (
        <div className="filter-bar">
          <span className="filter-label">
            <i className="bi bi-funnel-fill me-1"></i>Filter
          </span>
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn ${filterBtnClass(f)} ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
              <span className="badge-count">{count(f)}</span>
            </button>
          ))}
        </div>
      )}

      {/* ── Content ── */}
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="server-error">
          <i className="bi bi-exclamation-triangle-fill fs-5"></i>
          <div>
            <strong>Connection error.</strong> {error}
            <br />
            <button
              onClick={loadTasks}
              style={{ background: "none", border: "none", color: "inherit", textDecoration: "underline", cursor: "pointer", padding: 0, marginTop: 6 }}
            >
              Try again
            </button>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState filter={activeFilter} />
      ) : (
        <div className="row g-4">
          {filtered.map((task) => (
            <div key={task._id} className="col-12 col-sm-6 col-xl-4">
              <TaskCard task={task} onComplete={handleComplete} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
