// components/Navbar.jsx — Glassmorphism sticky navbar

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ lightMode, toggleMode }) => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="app-navbar">
      <div className="container d-flex align-items-center justify-content-between gap-3">

        {/* ── Brand ── */}
        <Link
          to="/"
          className="text-decoration-none d-flex align-items-center gap-2"
          onClick={() => setOpen(false)}
        >
          {/* Logo mark */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg,#6c63ff,#f5576c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              flexShrink: 0,
            }}
          >
            <i className="bi bi-kanban-fill text-white"></i>
          </div>
          <span className="navbar-brand-text">TaskPortal</span>
        </Link>

        {/* ── Desktop nav ── */}
        <div className="d-none d-md-flex align-items-center gap-1">
          <Link
            to="/"
            className={`nav-link-custom ${pathname === "/" ? "active-link" : ""}`}
          >
            <i className="bi bi-grid-3x3-gap-fill"></i>
            Dashboard
          </Link>
          <Link
            to="/add-task"
            className={`nav-link-custom ${pathname === "/add-task" ? "active-link" : ""}`}
          >
            <i className="bi bi-plus-circle-fill"></i>
            Add Task
          </Link>
        </div>

        {/* ── Right controls ── */}
        <div className="d-flex align-items-center gap-2">
          {/* Mode toggle */}
          <button
            className="dark-toggle"
            onClick={toggleMode}
            title={lightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
            aria-label="Toggle colour mode"
          >
            <i className={`bi ${lightMode ? "bi-moon-fill" : "bi-sun-fill"}`}></i>
          </button>

          {/* Mobile hamburger */}
          <button
            className="dark-toggle d-md-none"
            onClick={() => setOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            <i className={`bi ${open ? "bi-x-lg" : "bi-list"}`}></i>
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      {open && (
        <div
          className="container mt-2 pb-2 d-md-none"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Link
            to="/"
            className={`nav-link-custom d-flex mt-2 ${pathname === "/" ? "active-link" : ""}`}
            onClick={() => setOpen(false)}
          >
            <i className="bi bi-grid-3x3-gap-fill"></i>
            Dashboard
          </Link>
          <Link
            to="/add-task"
            className={`nav-link-custom d-flex mt-1 ${pathname === "/add-task" ? "active-link" : ""}`}
            onClick={() => setOpen(false)}
          >
            <i className="bi bi-plus-circle-fill"></i>
            Add Task
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
