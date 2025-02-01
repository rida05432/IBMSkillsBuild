import React, { useState } from "react";
import Avatar from "react-avatar"; // Import Avatar for the profile icon
import { FaHome, FaTasks, FaComments, FaChartLine } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Bar, Pie } from "react-chartjs-2"; // Correctly import both Bar and Pie
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js"; // Import necessary elements for charts
import "./Analytics.css"; // Ensure that you have the necessary CSS for sidebar styling
import Sidebar from "../Sidebar/Sidebar.jsx";
// Register the required elements for both Bar and Pie charts
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Analytics = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // State to manage sidebar visibility

  // Add this backlog tasks array
  const b_tasks = [
    "Review project documentation",
    "Update user interface design",
    "Fix reported bugs in login system",
    "Implement new feature requests",
    "Conduct performance testing",
    "Update API documentation",
  ];

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarCollapsed((prevState) => !prevState);
  };

  // Dummy tasks for Backlog

  // Dummy data for task performance report
  const performanceData = [
    { employeeName: "Alice", completedTasks: 4, totalTasks: 5 },
    { employeeName: "Dave", completedTasks: 3, totalTasks: 4 },
    { employeeName: "Charlie", completedTasks: 5, totalTasks: 5 },
    { employeeName: "Eve", completedTasks: 3, totalTasks: 6 },
    { employeeName: "Bob", completedTasks: 1, totalTasks: 3 },
  ];
  const getLowestPerformer = () => {
    // Calculate efficiency based on completedTasks / totalTasks and find the lowest
    let lowestPerformer = performanceData.reduce((prev, current) => {
      const prevEfficiency = prev.completedTasks / prev.totalTasks;
      const currentEfficiency = current.completedTasks / current.totalTasks;
      return prevEfficiency < currentEfficiency ? prev : current;
    });

    return lowestPerformer;
  };

  const [isReportVisible, setIsReportVisible] = useState(false);

  // Function to toggle report visibility
  const toggleReportVisibility = () => {
    setIsReportVisible((prevState) => !prevState);
  };

  // Dummy data for users
  const dummyUsers = [
    { id: 1, name: "Alice", status: "Pending" },
    { id: 2, name: "Bob", status: "Active" },
    { id: 3, name: "Charlie", status: "Suspended" },
    { id: 4, name: "David", status: "Active" },
    { id: 5, name: "Eve", status: "Pending" },
  ];

  // State to manage the expansion of the "Manage Users" section and user data
  const [isExpanded, setIsExpanded] = useState(false);
  const [users, setUsers] = useState(dummyUsers);

  // Toggle function to expand/collapse the "Manage Users" section
  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  // Function to change user status
  const updateUserStatus = (id, status) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, status } : user
    );
    setUsers(updatedUsers);
  };

  // Function to delete a user
  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  // Dummy data for task timeline chart
  const taskTimelineData = {
    labels: [
      "Code Review",
      "Marketing Plan",
      "Boots Delivery System",
      "AI Chatbot Integration",
      "Noir App",
    ], // Project names
    datasets: [
      {
        label: "Deadline (Days Left)",
        data: [10, 15, 5, 7, 11], // Deadlines for each project
        backgroundColor: "#BEC7E7", // Purple color for Deadline bars,
      },
      {
        label: "Assumed Completion (Days)",
        data: [8, 13, 6, 5, 4], // Assumed completion for each project
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Blue color
      },
    ],
  };

  const [tasks, setTasks] = useState([
    { taskName: "Team meeting preparation", employeeName: "David" },
    { taskName: "Fix bugs in Noir App", employeeName: "Charlie" },
    { taskName: "Code review", employeeName: "Eve" },
    { taskName: "Budgeting for AI chatbot", employeeName: "Nelson" },
    { taskName: "Client Meeting with Boots", employeeName: "Alice" },
    { taskName: "Complete project documentation", employeeName: "Bob" },
  ]);

  const [taskName, setTaskName] = useState("");
  const [employeeName, setEmployeeName] = useState("");

  // Data for pie chart
  const pieChartData = {
    labels: tasks.map((task) => task.employeeName),
    datasets: [
      {
        data: tasks.map(() => 1), // Equal task distribution
        backgroundColor: [
          "#BEC7E7",
          "#d3d2c7",
          "#fff4bd",
          "rgba(75, 192, 192, 0.6)",
          "#F7C9B6",
          "#b1d8b7",
          "#e6b794",
          "#d3b5e5",
          "#8cbcb6",
        ],
      },
    ],
  };

  // Pie chart options to show task name on hover
  const pieChartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            // Show the task name instead of the count
            const task = tasks[context.dataIndex]; // Get the task from the dataIndex
            return `${task.taskName} (Assigned to: ${task.employeeName})`;
          },
        },
      },
    },
    responsive: true,
  };

  // Function to add a new task
  const addTask = (e) => {
    e.preventDefault();
    setTasks([...tasks, { taskName, employeeName }]);
    setTaskName("");
    setEmployeeName("");
  };

  return (
    <div className="analytics-container">
      {/* Header */}
      <div className="top-bar">
        <span className="header-text">Leaderboard</span>
        <div className="user-avatar">
          <FontAwesomeIcon icon={faBell} className="bell-icon" />
          <Avatar
            name="Alice"
            round={true}
            size="50"
            color="#0a6476"
            textColor="#333"
          />
        </div>
      </div>
      {/* Main Content */}
      <main className="analytics-content">
        {/* Combined Card for Backlog, Timeline, and Efficiency */}
        <div className="combined-analytics-card">
          <div className="combined-header">
            <h2>Statistics</h2>
          </div>
          <div className="combined-content">
            {/* Backlog Section */}
            <div className="backlog-section">
              <h3>Backlog</h3>
              <ul className="backlog-task-list">
                {b_tasks.map((task, index) => (
                  <li key={index} className="backlog-task-item">
                    {task}
                  </li>
                ))}
              </ul>
            </div>

            {/* Task Timeline Section */}
            <div className="timeline-section">
              <h3>Task Timeline</h3>
              <div className="line-chart-container">
                <Bar
                  data={taskTimelineData}
                  options={{
                    responsive: true,
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: "Days Left",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Task Efficiency Section */}
            <div className="efficiency-section">
              <h3>Task Completion Efficiency</h3>
              <ul className="efficiency-list">
                {performanceData.map((member, index) => (
                  <li key={index}>
                    <Avatar
                      name={member.employeeName}
                      round
                      size="30"
                      color={
                        ["#e57373", "#81c784", "#64b5f6", "#ffb74d", "#ba68c8"][
                          index % 5
                        ]
                      }
                      textColor="#fff"
                    />
                    {` ${member.employeeName}: ${member.completedTasks}/${member.totalTasks} tasks completed`}
                  </li>
                ))}
              </ul>
              <div className="training-suggestion">
                {(() => {
                  const lowestPerformer = getLowestPerformer();
                  return (
                    <p>
                      RECOMMENDATION: Employee{" "}
                      <strong>{lowestPerformer.employeeName}</strong> needs
                      training.
                    </p>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* Task Distribution Pie Chart Card */}
        <div className="task-pie-chart-card">
          <h2 className="timeline-title">Task Distribution</h2>
          <div className="pie-chart-container">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>

          {/* Add Task Form */}
          <div className="add-task-form">
            <h3>Add New Task</h3>
            <form onSubmit={addTask}>
              <input
                type="text"
                placeholder="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Employee Name"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                required
              />
              <button type="submit" className="manager-add-task-button">
                Add Task
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
