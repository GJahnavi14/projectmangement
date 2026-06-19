// components/EmptyState.jsx — Illustrated empty state

import React from "react";
import { Link } from "react-router-dom";

const EmptyState = ({ filter }) => {
  const isFiltered = filter && filter !== "All";

  return (
    <div className="empty-wrap">
      <div className="empty-icon-wrap">
        <span>{isFiltered ? "🔍" : "📋"}</span>
      </div>

      <h5 className="empty-title">
        {isFiltered ? `No "${filter}" tasks` : "No tasks yet"}
      </h5>

      <p className="empty-sub">
        {isFiltered
          ? `There are no tasks with status "${filter}". Try a different filter or create a new task.`
          : "Your workspace is empty. Create your first task to get started!"}
      </p>

      <Link to="/add-task" className="btn-add-task">
        <i className="bi bi-plus-lg"></i>
        Create First Task
      </Link>
    </div>
  );
};

export default EmptyState;
