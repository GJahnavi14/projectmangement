// components/Loader.jsx — Glowing gradient spinner

import React from "react";

const Loader = ({ message = "Fetching your tasks..." }) => (
  <div className="loader-wrap" role="status" aria-live="polite">
    <div className="glow-spinner"></div>
    <p className="loader-text">{message}</p>
  </div>
);

export default Loader;
