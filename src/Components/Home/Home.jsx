import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import Avatar from "react-avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Home.css";

const projects = [
  { name: "Shop Inventory", totalTasks: 20, completedTasks: 15 },
  { name: "Delivery App", totalTasks: 25, completedTasks: 20 },
  { name: "Requirements Documentation", totalTasks: 18, completedTasks: 10 },
  { name: "Backend API", totalTasks: 22, completedTasks: 12 },
  { name: "UI Design", totalTasks: 15, completedTasks: 12 },
];

const averageCompletionRate =
  (projects.reduce((sum, project) => sum + project.completedTasks, 0) /
    projects.reduce((sum, project) => sum + project.totalTasks, 0)) *
  100;

const collaboratorColors = {
  Alice: "#2BA0B4",
  Bob: "#BEC7E7",
  Steven: "#B7DBD1",
};

const projectData = [
  {
    title: "Addressing the AI Transition in Skills and Jobs",
    content:
      "Exploring how AI is transforming the job market",
    category: "Technical",
    image: "https://uk.newsroom.ibm.com/image/Banner1920x720Ambrosetti.jpg", // Example image URL
    id: 1,
  },
  {
    title: "JavaScript ES6 Features",
    content: "Learn about the new features introduced in ES6.",
    category: "Technical",
    image:
      "https://media.licdn.com/dms/image/v2/D4D12AQHeu6x2jIurgw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1702274710606?e=1735776000&v=beta&t=uic0nenAC1uAybIjvCjU8s_N4xNfFX8r6kFwM3pStvk", // Example image URL
    id: 2,
  },
  {
    title: "The Future of Web Development",
    content:
      "Exploring trends and technologies shaping the future of web development.",
    category: "Non-Technical",
    image:
      "https://media.licdn.com/dms/image/D4E12AQF2nlfXoZK2Yw/article-cover_image-shrink_600_2000/0/1675704281846?e=2147483647&v=beta&t=Rs9ejfu9oorJGUiudx8OkCEx0JKdFPsa_WIx0qmtS4Y", // Example image URL
    id: 3,
  },
  {
    title: "Cloud Computing Essentials",
    content: "Master the fundamentals of cloud computing with IBM Cloud.",
    category: "Technical",
    image: "https://www.ibm.com/content/dam/connectedassets-adobe-cms/worldwide-content/stock-assets/future/cloud/lead/06/cloud_lead_06.component.xl.ts=1697463452897.png/content/adobe-cms/us/en/cloud/overview/jcr:content/root/leadspace",
    id: 4,
  },
  {
    title: "Data Science Fundamentals",
    content: "Learn the basics of data science and analytics.",
    category: "Technical",
    image: "https://www.ibm.com/content/dam/connectedassets-adobe-cms/worldwide-content/stock-assets/future/data/lead/06/data_lead_06.component.xl.ts=1697463452897.png/content/adobe-cms/us/en/analytics/overview/jcr:content/root/leadspace",
    id: 5,
  },
  {
    title: "Leadership in Tech",
    content: "Develop essential leadership skills for the tech industry.",
    category: "Non-Technical",
    image: "https://www.ibm.com/content/dam/connectedassets-adobe-cms/worldwide-content/stock-assets/future/lead/06/future_lead_06.component.xl.ts=1697463452897.png/content/adobe-cms/us/en/employment/jcr:content/root/leadspace",
    id: 6,
  }
];

const Home = () => {
  const [date, setDate] = useState(new Date());
  const [taskList, setTasks] = useState([
    { id: 1, task: "Complete project documentation", completed: false },
    { id: 2, task: "Prepare for presentation", completed: false },
    { id: 3, task: "Fix bugs in the delivery app", completed: false },
  ]);

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      taskList.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="home-container">
      <main className="main-content">
        {/* Header */}
        <div className="top-bar">
          <span className="header-text">Good Morning, Alice 👋</span>
          <div className="main-user-info">
            <FontAwesomeIcon icon={faBell} className="bell-icon" />
            <div className="user-avatar">
              <Avatar
                name="Alice"
                round={true}
                size="50"
                color="#0a6476"
                textColor="#333"
              />
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="content">
          <div className="grid-container">
            {/* Projects Overview Section */}
            <div className="tasks-section white-section">
              <h3>Projects Overview</h3>
              <div className="overview-charts">
                {/* Pie Chart for Average Completion Rate */}
                <div className="average-completion-pie">
                  <PieChart
                    series={[
                      {
                        data: [
                          {
                            id: "completed",
                            value: averageCompletionRate,
                            color: "#2BA0B4",
                          },
                          {
                            id: "remaining",
                            value: 100 - averageCompletionRate,
                            color: "#ddd",
                          },
                        ],
                        innerRadius: 73,
                        outerRadius: 100,
                        paddingAngle: 3,
                        colors: ["#2BA0B4", "#ddd"],
                      },
                    ]}
                    width={300}
                    height={300}
                    slotProps={{
                      labels: {
                        render: ({ datum }) => {
                          if (datum.id === "remaining") return "";
                          return `${averageCompletionRate.toFixed(
                            0
                          )}% Completed`;
                        },
                        style: {
                          fontSize: 12,
                          fill: "#333",
                          textAnchor: "middle",
                          dominantBaseline: "central",
                        },
                      },
                    }}
                  />
                </div>

                {/* Bar Chart for Project-Specific Task Counts */}
                <div className="projects-bar-chart">
                  <BarChart
                    series={[
                      {
                        data: projects.map((project) => project.totalTasks),
                        label: "Total Tasks",
                        color: "#BEC7E7",
                      },
                      {
                        data: projects.map((project) => project.completedTasks),
                        label: "Completed Tasks",
                        color: "#2BA0B4",
                      },
                    ]}
                    categories={projects.map((project) => project.name)}
                    width={500}
                    height={300}
                    axisLabels={{ x: 'Courses Taken', y: 'Hours Spent' }}
                    margin={{ left: 50, right: 20, top: 40, bottom: 50 }}
                    slotProps={{
                      legend: {
                        direction: 'row',
                        position: { vertical: 'top', horizontal: 'middle' },
                        padding: 0,
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Calendar Section */}
            <div className="calendar white-section">
              <h3>Calendar</h3>
              <Calendar value={date} onChange={setDate} />
            </div>

            {/* To-do List Section */}
            <div className="todo-list white-section">
              <h3>To-do List</h3>
              <ul>
                {taskList.map((task) => (
                  <li key={task.id}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                    />
                    <span
                      style={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {task.task}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Post Section */}
            <div className="posts white-section">
              <h3>Recent IBM Posts</h3>
              <div className="post-grid">
                {projectData.map((item, index) => (
                  <div key={item.id} className="topic-card">
                    {item.image && (
                      <img
                        src={item.image}
                        alt="Topic"
                        className="topic-image"
                      />
                    )}
                    <h2>{item.title}</h2>
                    <p>{item.content}</p>
                    <span
                      className={`category-label ${item.category.toLowerCase()}`}
                    >
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
