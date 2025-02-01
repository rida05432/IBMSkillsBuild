import React, { useState } from "react";
import "./Projects.css"; // Import the updated CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Avatar from "react-avatar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import Sidebar from "../Sidebar/Sidebar.jsx"; // Import Sidebar component

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Boots Delivery System",
      description: "Overview of Boots Delivery System.",
      details:
        "The Boots Delivery System project focuses on building a comprehensive delivery infrastructure for the Boots pharmacy chain, aiming to enhance last-mile delivery efficiency. Key aspects include implementing route optimization algorithms to ensure minimal delivery times, utilizing predictive analytics for demand forecasting, and integrating real-time tracking features for end-users. Additionally, the project involves designing a user-friendly driver application, establishing a scalable backend to handle increasing delivery volumes, and incorporating feedback loops to continuously refine delivery accuracy. The ultimate goal is to reduce delivery time by 20% and improve customer satisfaction by enhancing delivery reliability.",
      teamMembers: [
        { name: "Alice", position: "Project Manager" },
        { name: "Bob", position: "Lead Developer" },
        { name: "Steven", position: "QA Engineer" },
      ],
      tasks: [
        "Define delivery routes",
        "Test delivery system",
        "Optimize delivery schedules",
      ],
      tasksCompleted: 2,
    },
    {
      id: 2,
      title: "E-commerce Platform Revamp",
      description: "Revamping the current e-commerce platform.",
      details:
        "This project entails a complete overhaul of the existing e-commerce platform to significantly enhance user experience, increase site performance, and boost sales conversion rates. The redesign includes implementing a responsive layout optimized for mobile devices, restructuring navigation for intuitive browsing, and introducing personalized product recommendations based on user behavior. New features, such as a streamlined checkout process and improved search functionality, aim to reduce cart abandonment. Additionally, the platform will be optimized for faster load times and SEO, and security measures like encrypted transactions and advanced fraud detection will be integrated. Post-revamp, the platform should yield a 30% increase in average session duration and a 15% lift in conversion rates.",
      teamMembers: [
        { name: "Alice", position: "UX Designer" },
        { name: "Charlie", position: "Frontend Developer" },
      ],
      tasks: ["Gather requirements", "Design new UI", "Implement changes"],
      tasksCompleted: 1,
    },
    {
      id: 3,
      title: "AI Chatbot Integration",
      description: "Developing an Inventory management system.",
      details:
        "The AI Chatbot Integration project is focused on creating a chatbot that streamlines customer service for inventory-related inquiries. Built with Natural Language Processing (NLP), the chatbot will answer questions about stock availability, order status, and restock dates. Integration with the company’s ERP system will allow the chatbot to pull real-time data and learn from frequent customer interactions to provide increasingly accurate responses. The chatbot is also designed to collect insights into customer needs and alert the sales team about potential demand spikes. Expected outcomes include a 40% reduction in customer service response times and improved customer engagement.",
      teamMembers: [
        { name: "Micheal", position: "Backend Developer" },
        { name: "Nikko", position: "Data Scientist" },
        { name: "Stacey", position: "Product Owner" },
        { name: "Emanuel", position: "Frontend Developer" },
      ],
      tasks: [
        "Gather requirements specs",
        "Carry out UX testing",
        "Stage 3 Testing and Prototyping",
      ],
      tasksCompleted: 1,
    },
  ];

  const [activeProject, setActiveProject] = useState(projects[0]); // Default active project is the first one

  const handleProjectSelect = (project) => {
    setActiveProject(project); // Set the selected project as active
  };

  return (
    <div className="project-page">
      <h1 className="projects-header">PROJECTS</h1>
      <div className="projects-page-wrapper">
        <div className="projects-sidebar">
          <div className="user-info">
            <FontAwesomeIcon icon={faBell} className="bell-icon" />
            <Avatar name="Alice" round={true} size="50" color="#0a6476" />
            {/* <span className="user-name">Alice / Backend Developer</span> */}
          </div>
          <h4 className="projects-title-header">Project Titles</h4>
          {projects.map((project) => (
            <button
              key={project.id}
              className={`project-title-button ${
                activeProject.id === project.id ? "active" : ""
              }`}
              onClick={() => handleProjectSelect(project)}
            >
              {project.title}
            </button>
          ))}
        </div>

        <div className="project-info-content">
          <div className="project-info-box">
            <h2>{activeProject.title}</h2>
            <p>{activeProject.details}</p>
          </div>

          <div className="team-members-box">
            <h3>Team Members</h3>
            <ul
              style={{
                listStyleType: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {activeProject.teamMembers.map((member, index) => {
                const initials = member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("");
                const avatarClass = `avatar-color-${(index % 4) + 1}`; // Loop colors for avatars
                return (
                  <li
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div className={`team-member-avatar ${avatarClass}`}>
                      {initials}
                    </div>
                    <strong>{member.name}</strong> -{" "}
                    <span>{member.position}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="tasks-box">
            <h3>Tasks Outline</h3>
            <ul>
              {activeProject.tasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
            <p>
              Currently {activeProject.tasksCompleted} out of{" "}
              {activeProject.tasks.length} tasks completed
            </p>
          </div>

          <div className="tasks-completed-box">
            <h3>Project Timeline</h3>

            {/* Horizontal Timeline */}
            <div className="hori-timeline" dir="ltr">
              <ul className="list-inline events">
                <li className="list-inline-item event-list">
                  <div className="px-4">
                    <div className="event-date bg-soft-primary text-primary">
                      2 June
                    </div>
                    <h5 className="font-size-16">Event One</h5>
                    <p className="text-muted">
                      It will be as simple as occidental in fact it will be
                      Occidental Cambridge friend
                    </p>
                  </div>
                </li>
                <li className="list-inline-item event-list">
                  <div className="px-4">
                    <div className="event-date bg-soft-success text-success">
                      5 June
                    </div>
                    <h5 className="font-size-16">Event Two</h5>
                    <p className="text-muted">
                      Everyone realizes why a new common language one could
                      refuse translators.
                    </p>
                  </div>
                </li>
                <li className="list-inline-item event-list">
                  <div className="px-4">
                    <div className="event-date bg-soft-danger text-danger">
                      7 June
                    </div>
                    <h5 className="font-size-16">Event Three</h5>
                    <p className="text-muted">
                      If several languages coalesce the grammar of the resulting
                      simple and regular
                    </p>
                  </div>
                </li>
                <li className="list-inline-item event-list">
                  <div className="px-4">
                    <div className="event-date bg-soft-warning text-warning">
                      8 June
                    </div>
                    <h5 className="font-size-16">Event Four</h5>
                    <p className="text-muted">
                      Languages only differ in their pronunciation and their
                      most common words.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
