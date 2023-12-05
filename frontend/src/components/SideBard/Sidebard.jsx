import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebard.css";

const Sidebar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const togglingSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <div className="page-container">
        <aside className={`sidebar ${sidebarVisible ? "sidebar-visible" : ""}`}>
          <button className="toggling" onClick={togglingSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="20" viewBox="0 0 50 50">
              <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
            </svg></button>
          <h2>CourseFinder</h2>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/courses">Cursos</Link></li>
            <li><Link to="/Profile">Perfil</Link></li>
            <li><Link to="/create-course">Crear Curso</Link></li>
          </ul>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
