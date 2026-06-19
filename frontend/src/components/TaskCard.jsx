// components/TaskCard.jsx — Glassmorphism task card

import React, { useState } from "react";

const formatDate = (d) =>
  new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

const stripeClass = (status) => {
  if (status === "Pending")    return "stripe-pending";
  if (status === "In Progress") return "stripe-progress";
  return "stripe-done";
};

const badgeClass = (status) => {
  if (status === "Pending")    return "badge-pending";
  if (status === "In Progress") return "badge-progress";
  return "badge-done";
};

const badgeIcon = (status) => {
  if (status === "Pending")    return "bi-clock";
  if (status === "In Progress") return "bi-lightning-charge-fill";
  return "bi-check-circle-fill";
};

const TaskCard = ({ task, onComplete, onDelete }) => {
  const [completing, setCompleting] = useState(false);
  const [deleting,   setDeleting]   = useState(false);

  const handleComplete = async () => {
    setCompleting(true);
    await onComplete(task._id);
    setCompleting(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(task._id);
    setDeleting(false);
  };

  const done = task.status === "Completed";

  return (
    <div className="task-card">
      {/* Coloured top stripe */}
      <div className={`task-card-stripe ${stripeClass(task.status)}`}></div>

      <div className="task-card-body">
        {/* Status badge */}
        <div className="mb-2">
          <span className={`status-badge ${badgeClass(task.status)}`}>
            <i className={`bi ${badgeIcon(task.status)}`}></i>
            {task.status}
          </span>
        </div>

        {/* Title */}
        <h6 className={`task-title ${done ? "completed-title" : ""}`}>
          {task.title}
        </h6>

        {/* Description */}
        <p className="task-desc">{task.description}</p>
      </div>

      {/* Footer */}
      <div className="task-card-footer">
        <span className="task-date">
          <i className="bi bi-calendar3"></i>
          {formatDate(task.created_at)}
        </span>

        <div className="d-flex gap-2">
          {!done && (
            <button
              className="btn-complete"
              onClick={handleComplete}
              disabled={completing || deleting}
              title="Mark as completed"
            >
              {completing ? (
                <span className="spinner-border spinner-border-sm" style={{ width: 12, height: 12, borderWidth: 2 }}></span>
              ) : (
                <i className="bi bi-check-lg"></i>
              )}
              Done
            </button>
          )}

          <button
            className="btn-delete"
            onClick={handleDelete}
            disabled={completing || deleting}
            title="Delete task"
          >
            {deleting ? (
              <span className="spinner-border spinner-border-sm" style={{ width: 12, height: 12, borderWidth: 2 }}></span>
            ) : (
              <i className="bi bi-trash3"></i>
            )}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
