// pages/AddTask.jsx — Glassmorphism form to create a task

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createTask } from "../services/api";

const MIN_DESC = 20;

const AddTask = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: "", description: "", status: "Pending" });
  const [errors, setErrors]         = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverErr, setServerErr]   = useState(null);

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.title.trim())              e.title = "Task title is required.";
    else if (form.title.trim().length < 3) e.title = "Title must be at least 3 characters.";

    if (!form.description.trim())            e.description = "Description is required.";
    else if (form.description.trim().length < MIN_DESC)
      e.description = `Need ${MIN_DESC - form.description.trim().length} more character(s).`;

    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerErr(null);
    const ve = validate();
    if (Object.keys(ve).length) { setErrors(ve); return; }

    setSubmitting(true);
    try {
      await createTask({ title: form.title.trim(), description: form.description.trim(), status: form.status });
      navigate("/");
    } catch (err) {
      setServerErr(err.response?.data?.message || "Failed to create task. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const descLen  = form.description.trim().length;
  const descOk   = descLen >= MIN_DESC;

  return (
    <div className="form-page-bg">
      <div className="w-100">

        {/* ── Breadcrumb ── */}
        <div className="breadcrumb-custom">
          <Link to="/">Dashboard</Link>
          <span className="sep">/</span>
          <span className="current">Add Task</span>
        </div>

        {/* ── Glass card ── */}
        <div className="form-glass-card">

          {/* Header */}
          <div className="mb-4">
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "linear-gradient(135deg,#6c63ff,#f5576c)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem",
                marginBottom: "1rem",
              }}
            >
              <i className="bi bi-plus-lg text-white"></i>
            </div>
            <h2 className="form-page-title">Create New Task</h2>
            <p className="form-page-sub">Fill in the details below and hit create.</p>
          </div>

          {/* Server error */}
          {serverErr && (
            <div className="server-error">
              <i className="bi bi-exclamation-circle-fill"></i>
              {serverErr}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>

            {/* Title */}
            <div className="mb-4">
              <label className="form-label-custom" htmlFor="title">
                Task Title <span style={{ color: "#f5576c" }}>*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className={`form-input-custom ${errors.title ? "input-error" : form.title ? "input-ok" : ""}`}
                placeholder="e.g. Build the login page"
                value={form.title}
                onChange={handleChange}
                maxLength={100}
                disabled={submitting}
                autoComplete="off"
              />
              {errors.title && (
                <p className="field-error">
                  <i className="bi bi-exclamation-circle-fill"></i>
                  {errors.title}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="form-label-custom" htmlFor="description">
                Description <span style={{ color: "#f5576c" }}>*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className={`form-input-custom ${errors.description ? "input-error" : descOk ? "input-ok" : ""}`}
                placeholder="Describe the task in at least 20 characters…"
                value={form.description}
                onChange={handleChange}
                disabled={submitting}
                style={{ resize: "vertical" }}
              />
              {errors.description ? (
                <p className="field-error">
                  <i className="bi bi-exclamation-circle-fill"></i>
                  {errors.description}
                </p>
              ) : (
                <div className="d-flex justify-content-between">
                  <span className={`char-hint ${descOk ? "ok" : ""}`}>
                    {descOk ? "✓ Minimum length reached" : `${MIN_DESC - descLen} more character(s) needed`}
                  </span>
                  <span className="char-hint">{descLen} chars</span>
                </div>
              )}
            </div>

            {/* Status chips */}
            <div className="mb-5">
              <label className="form-label-custom">Initial Status</label>
              <div className="status-chips">
                {["Pending", "In Progress"].map((s) => (
                  <div className="status-chip" key={s}>
                    <input
                      type="radio"
                      id={`status-${s}`}
                      name="status"
                      value={s}
                      checked={form.status === s}
                      onChange={handleChange}
                      disabled={submitting}
                    />
                    <label
                      htmlFor={`status-${s}`}
                      className={s === "Pending" ? "chip-pending" : "chip-progress"}
                    >
                      {s === "Pending" ? "⏳" : "⚡"} {s}
                    </label>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.3)", marginTop: "0.4rem" }}>
                <i className="bi bi-info-circle me-1"></i>
                Mark as "Completed" from the dashboard.
              </p>
            </div>

            {/* Buttons */}
            <div className="d-flex gap-3 flex-wrap">
              <button type="submit" className="btn-submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm" style={{ width: 14, height: 14, borderWidth: 2 }}></span>
                    Creating…
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-lg"></i>
                    Create Task
                  </>
                )}
              </button>

              <Link to="/" className="btn-cancel">
                <i className="bi bi-arrow-left"></i>
                Cancel
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
