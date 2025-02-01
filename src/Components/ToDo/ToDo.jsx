import "./ToDo.css"; // Custom CSS
import Avatar from "react-avatar";
import Sidebar from "../Sidebar/Sidebar.jsx"; // Import Sidebar component
import React, { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const ToDoList = () => {
  // Hardcoded initial tasks
  const [tasks, setTasks] = useState({
    todo: [
      {
        title: "Task 1",
        description: "Task 1 description",
        currentProgress: "todo",
        deadline: "2024-10-20",
      },
      {
        title: "Task 2",
        description: "Task 2 description",
        currentProgress: "todo",
        deadline: "2024-10-21",
      },
      {
        title: "Task 2",
        description: "Task 2 description",
        currentProgress: "todo",
        deadline: "2024-10-21",
      },
      {
        title: "Task 2",
        description: "Task 2 description",
        currentProgress: "todo",
        deadline: "2024-10-21",
      },
    ],
    inProgress: [
      {
        title: "Task 3",
        description: "Task 3 description",
        currentProgress: "inProgress",
        deadline: "2024-10-22",
      },
      {
        title: "Task 2",
        description: "Task 2 description",
        currentProgress: "todo",
        deadline: "2024-10-21",
      },
    ],
    done: [
      {
        title: "Task 4",
        description: "Task 4 description",
        currentProgress: "done",
        deadline: "2024-10-15",
      },
      {
        title: "Task 2",
        description: "Task 2 description",
        currentProgress: "todo",
        deadline: "2024-10-21",
      },
    ],
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    currentProgress: "todo",
    deadline: "",
  });

  // New state to track editing task
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskColumn, setEditingTaskColumn] = useState(null); // Track which column the task belongs to

  // Function to handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // Function to add or update a task
  const saveTask = () => {
    const updatedTasks = { ...tasks };

    // If editing, we need to find and remove the task from its current column
    if (isEditing) {
      const taskIndex = updatedTasks[editingTaskColumn].findIndex(
        (task) => task.title === editingTaskId
      );

      // Remove the task from the old column
      const taskToUpdate = updatedTasks[editingTaskColumn][taskIndex];

      // Check if the current progress has changed
      if (taskToUpdate.currentProgress !== newTask.currentProgress) {
        updatedTasks[editingTaskColumn].splice(taskIndex, 1); // Remove from old column
        updatedTasks[newTask.currentProgress].push({ ...newTask }); // Add to new column
      } else {
        // If no change in progress, just update the existing task
        updatedTasks[editingTaskColumn][taskIndex] = newTask;
      }
    } else {
      // Add new task
      updatedTasks[newTask.currentProgress].push(newTask);
    }

    setTasks(updatedTasks);
    resetForm();
  };

  // Function to reset the form
  const resetForm = () => {
    setIsFormOpen(false);
    setNewTask({
      title: "",
      description: "",
      currentProgress: "todo",
      deadline: "",
    });
    setIsEditing(false);
    setEditingTaskId(null);
    setEditingTaskColumn(null); // Reset the editing task column
  };

  // Function to open the form for editing
  const openEditForm = (task, column) => {
    setNewTask(task);
    setIsFormOpen(true);
    setIsEditing(true);
    setEditingTaskId(task.title);
    setEditingTaskColumn(column); // Set the column of the task being edited
  };

  // Deadline check and notification
  // useEffect(() => {
  //   const checkDeadlines = () => {
  //     const allTasks = [...tasks.todo, ...tasks.inProgress];
  //     allTasks.forEach((task) => {
  //       const deadline = moment(task.deadline);
  //       if (moment().isAfter(deadline.subtract(1, "days"))) {
  //         toast.warning(`Task "${task.title}" is nearing its deadline!`);
  //       }
  //     });
  //   };
  //   const interval = setInterval(checkDeadlines, 60000); // Check every minute
  //   return () => clearInterval(interval);
  // }, [tasks]);

  // Function to delete a task
  const deleteTask = (taskTitle, column) => {
    const updatedTasks = { ...tasks };
    updatedTasks[column] = updatedTasks[column].filter(
      (task) => task.title !== taskTitle
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="full-page">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      <div className="page-wrapper">
        <div className="user-info">
          <FontAwesomeIcon icon={faBell} className="bell-icon" />
          <Avatar name="Alice" round={true} size="50" color="#0a6476" />
          {/* <span className="user-name">Alice / Backend Developer</span> */}
        </div>

        <h1 className="header">My TO-DO List</h1>
        <button className="add-task-button" onClick={() => setIsFormOpen(true)}>
          Add Task
        </button>

        <div className="box-wrapper">
          {/* TO DO BOX */}
          <div className="box" style={{ backgroundColor: "#BEC7E7" }}>
            <h2>TO DO</h2>
            {tasks.todo.map((task, index) => (
              <div
                key={index}
                className="task"
                onClick={() => openEditForm(task, "todo")}
              >
                <span>{task.title}</span>
                <button
                  className="tasks-delete-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from bubbling up to the task
                    deleteTask(task.title, "todo"); // or "inProgress", "done" as per column
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>

          {/* IN-PROGRESS BOX */}
          <div className="box" style={{ backgroundColor: "#7ccdde" }}>
            <h2>IN PROGRESS</h2>
            {tasks.inProgress.map((task, index) => (
              <div
                key={index}
                className="task"
                onClick={() => openEditForm(task, "inProgress")}
              >
                <span>{task.title}</span>
                <button
                  className="tasks-delete-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from bubbling up to the task
                    deleteTask(task.title, "inProgress"); // For "In Progress" box
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>

          {/* DONE BOX */}
          <div className="box" style={{ backgroundColor: "#B7DBD1" }}>
            <h2>DONE</h2>
            {tasks.done.map((task, index) => (
              <div
                key={index}
                className="task"
                onClick={() => openEditForm(task, "done")}
              >
                <span>{task.title}</span>
                <button
                  className="tasks-delete-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from bubbling up to the task
                    deleteTask(task.title, "done"); // For "Done" box
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add/Edit Task Form */}
        {isFormOpen && (
          <div className="form-overlay">
            <div className="form-wrapper">
              <h2>{isEditing ? "Edit Task" : "Add New Task"}</h2>
              <input
                className="form-input"
                name="title"
                placeholder="Task Title"
                value={newTask.title}
                onChange={handleFormChange}
              />
              <input
                className="form-input"
                name="description"
                placeholder="Task Description"
                value={newTask.description}
                onChange={handleFormChange}
              />
              <select
                className="form-select"
                name="currentProgress"
                value={newTask.currentProgress}
                onChange={handleFormChange}
              >
                <option value="todo">TO DO</option>
                <option value="inProgress">IN PROGRESS</option>
                <option value="done">DONE</option>
              </select>
              <input
                className="form-input"
                name="deadline"
                type="date"
                value={newTask.deadline}
                onChange={handleFormChange}
              />
              <div>
                <button className="form-button" onClick={saveTask}>
                  {isEditing ? "Update" : "Save"}
                </button>
                <button className="form-button" onClick={resetForm}>
                  Discard
                </button>
              </div>
            </div>
          </div>
        )}

        {/* <ToastContainer /> */}
      </div>
    </div>
  );
};

export default ToDoList;
