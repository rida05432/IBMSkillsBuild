// Sidebar.jsx

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaSignOutAlt } from "react-icons/fa"; // Import the logout icon
import { faShield } from "@fortawesome/free-solid-svg-icons"; // Import the shield icon
import {
  FaHome,
  FaComments,
  FaUser,
  FaChartLine,
  FaRegListAlt,
} from "react-icons/fa"; // Other icons from react-icons
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation from react-router-dom
import "./Sidebar.css";
import { FaDiagramProject } from "react-icons/fa6";

const Sidebar = ({ show, toggle, role, onLogout }) => {
  const [activeLink, setActiveLink] = useState("/home"); // Set initial active link to "Home"
  const location = useLocation(); // To keep track of current location

  // Function to handle link clicks and update active state
  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <aside className={`sidebar ${show ? "collapsed" : ""}`}>
      <div className="header-container">
        <button className="toggle-button" onClick={toggle}>
          {show ? (
            "☰"
          ) : (
            <FontAwesomeIcon
              icon={faShield}
              className="icon-white-bg"
            />
          )}
        </button>
        <div className="sidebar-logo">IBMSkillsBuild+</div>
      </div>

      {/* New container for sidebar items and logout */}
      <div className="sidebar-nav-container">
        <ul className="sidebar-nav">
          <li
            className={`sidebar-item ${
              activeLink === "/home" ? "active-link" : ""
            }`}
            onClick={() => handleLinkClick("/home")}
          >
            <Link to="/home" className="sidebar-link">
              <FaHome className="sidebar-icon" /> <span>Home</span>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              activeLink === "/profile" ? "active-link" : ""
            }`}
            onClick={() => handleLinkClick("/profile")}
          >
            <Link to="/profile" className="sidebar-link">
              <FaUser className="sidebar-icon" /> <span>Profile</span>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              activeLink === "/todo" ? "active-link" : ""
            }`}
            onClick={() => handleLinkClick("/todo")}
          >
            <Link to="/todo" className="sidebar-link">
              <FaRegListAlt className="sidebar-icon" /> <span>To Do</span>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              activeLink === "/topics" ? "active-link" : ""
            }`}
            onClick={() => handleLinkClick("/topics")}
          >
            <Link to="/topics" className="sidebar-link">
              <FaComments className="sidebar-icon" /> <span>Posts</span>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              activeLink === "/projects" ? "active-link" : ""
            }`}
            onClick={() => handleLinkClick("/projects")}
          >
            <Link to="/projects" className="sidebar-link">
              <FaDiagramProject className="sidebar-icon" />{" "}
              <span>My Projects</span>
            </Link>
          </li>

          {/* Conditionally render the Analytics link based on the role */}
          {role === "Manager" && (
            <li
              className={`sidebar-item ${
                activeLink === "/analytics" ? "active-link" : ""
              }`}
              onClick={() => handleLinkClick("/analytics")}
            >
              <Link to="/analytics" className="sidebar-link">
                <FaChartLine className="sidebar-icon" /> <span>Analytics</span>
              </Link>
            </li>
          )}
        </ul>

        {/* Logout button as a sidebar item */}
        <div className="sidebar-item logout-item" onClick={onLogout}>
          <div className="sidebar-link">
            <FaSignOutAlt className="sidebar-icon" /> <span>Logout</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
