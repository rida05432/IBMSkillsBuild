// ProfilePage.js
import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FaTimes } from "react-icons/fa";
import Avatar from "react-avatar";
import userProfileImg from "./userprofileimg.png";
import "./ProfilePage.css";

const ProfilePage = ({ isAdmin }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("alicesmith@example.com");
  const [preferredName, setPreferredName] = useState("Alice Smith");
  const [position, setPosition] = useState("Manager");
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(1);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Alice",
      email: "employee1@example.com",
      status: "Active",
      recentActivity: "Completed task on Project A",
    },
    {
      id: 2,
      name: "Bob",
      email: "employee2@example.com",
      status: "No Recent Activity",
      recentActivity: "No recent activity",
    },
    {
      id: 3,
      name: "Martin",
      email: "employee2@example.com",
      status: "Active",
      recentActivity: "No recent activity",
    },
    {
      id: 2,
      name: "Steven",
      email: "employee2@example.com",
      status: "No Recent Activity",
      recentActivity: "No recent activity",
    },
  ]);

  // Generate array of 50 avatar URLs
  const avatars = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    url: `https://api.dicebear.com/7.x/avataaars/svg?seed=avatar${i + 1}`,
  }));

  const handleAvatarClick = () => {
    setShowAvatarModal(true);
  };

  const handleAvatarSelect = (avatarId) => {
    setSelectedAvatar(avatarId);
    setShowAvatarModal(false);
  };

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  // Handlers for user management
  const updateUserStatus = (id, status) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, status } : user
    );
    setUsers(updatedUsers);
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const [notification, setNotification] = useState(null);

  const handleSaveProfile = () => setIsEditing(false);
  const [profileImage, setProfileImage] = useState(userProfileImg);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handlePasswordChange = () => {
    const correctCurrentPassword = "password";
    if (currentPassword !== correctCurrentPassword) {
      alert("Current password is incorrect.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    alert("Password Changed");
  };

  const handleSuspend = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: "suspended" } : user
      )
    );
    setNotification("User suspended");
    setTimeout(() => setNotification(null), 2000);
  };

  const handleDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setNotification("User deleted");
    setTimeout(() => setNotification(null), 2000);
  };

  return (
    <div className="profile-main">
      {/* <Sidebar /> */}
      <div className="profile-page-container">
        <div className="user-info">
          <FontAwesomeIcon icon={faBell} className="bell-icon" />
          <div className="avatar-container" onClick={handleAvatarClick}>
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=avatar${selectedAvatar}`}
              alt="Profile"
              className="profile-avatar"
            />
            <div className="avatar-overlay">
              <span>Change Avatar</span>
            </div>
          </div>
          {/* <span className="user-name">Alice / Backend Developer</span> */}
        </div>
        <h1 className="profilepage-title">User Profile</h1>
        <div className="profile-grid-container">
          {/* User Profile Section */}
          <div className="profile-user-profile">
            <div className="profile-user-image">
              <img src={profileImage} alt="Profile" />
              <label className="change-pic-label" htmlFor="imageUpload">
                Change Photo
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
            <div className="user-change-details">
              <div className="profile-user-details">
                <h2>Personal Information</h2>
                <div>
                  <label>Email: </label>
                  {email}
                </div>
                <div>
                  <label>Preferred Name: </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={preferredName}
                      onChange={(e) => setPreferredName(e.target.value)}
                    />
                  ) : (
                    <span>{preferredName}</span>
                  )}
                </div>
                <div>
                  <label>Position: </label>
                  {position}
                </div>
                {isEditing ? (
                  <button onClick={handleSaveProfile}>Save</button>
                ) : (
                  <button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </button>
                )}
              </div>

              {/* Password Management Section */}
              <div className="profile-password-management">
                <h2>Password Management</h2>
                <div>
                  <label>Current Password: </label>
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <i
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  ></i>
                </div>
                <div>
                  <label>New Password: </label>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <i onClick={() => setShowNewPassword(!showNewPassword)}></i>
                </div>
                <div>
                  <label>Confirm New Password: </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <i
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  ></i>
                </div>
                <button onClick={handlePasswordChange}>Change Password</button>
              </div>
            </div>
          </div>

          {/* Admin Controls Section */}
          {isAdmin && (
            <div className="profile-admin-controls">
              <h2>Manage Employee Accounts</h2>

              {/* Moved Manage Users Section */}
              <div className="manage-users-section">
                <div className="manage-users-content">
                  <h3>User Accounts</h3>
                  <table className="user-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.status}</td>
                          <td>
                            {user.status === "Pending" && (
                              <button
                                onClick={() =>
                                  updateUserStatus(user.id, "Active")
                                }
                              >
                                Approve
                              </button>
                            )}
                            {user.status === "Active" && (
                              <button
                                onClick={() =>
                                  updateUserStatus(user.id, "Suspended")
                                }
                              >
                                Suspend
                              </button>
                            )}
                            {user.status === "Suspended" && (
                              <button
                                onClick={() =>
                                  updateUserStatus(user.id, "Active")
                                }
                              >
                                Reactivate
                              </button>
                            )}
                            <button
                              className="delete-btn"
                              onClick={() => deleteUser(user.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Avatar Selection Modal */}
      {showAvatarModal && (
        <div className="avatar-modal-overlay">
          <div className="avatar-modal">
            <button
              className="close-modal"
              onClick={() => setShowAvatarModal(false)}
            >
              <FaTimes />
            </button>
            <h3>Choose Your Avatar</h3>
            <div className="avatar-grid">
              {avatars.map((avatar) => (
                <div
                  key={avatar.id}
                  className={`avatar-option ${
                    selectedAvatar === avatar.id ? "selected" : ""
                  }`}
                  onClick={() => handleAvatarSelect(avatar.id)}
                >
                  <img src={avatar.url} alt={`Avatar ${avatar.id}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
