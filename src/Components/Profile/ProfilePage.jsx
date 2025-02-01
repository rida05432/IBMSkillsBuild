import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(1); // Default avatar

  // Generate array of 50 avatar URLs (using placeholder URLs for now)
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

  return (
    <div className="profile-container">
      <div className="profile-header">
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
        <h2>Your Profile</h2>
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
