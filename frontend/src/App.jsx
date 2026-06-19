// App.jsx — Root component: dark/light mode + routing

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";

function App() {
  // Persist light mode (dark is the default startup look)
  const [lightMode, setLightMode] = useState(() => {
    return localStorage.getItem("lightMode") === "true";
  });

  useEffect(() => {
    if (lightMode) {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
    localStorage.setItem("lightMode", lightMode);
  }, [lightMode]);

  const toggleMode = () => setLightMode((p) => !p);

  return (
    <>
      <Navbar lightMode={lightMode} toggleMode={toggleMode} />
      <div className="main-content">
        <div className="container">
          <Routes>
            <Route path="/"          element={<Dashboard />} />
            <Route path="/add-task"  element={<AddTask />} />
            <Route path="*"          element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
