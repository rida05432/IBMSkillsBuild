import React, { useState } from "react";
import { FaThumbsUp, FaComments, FaPlus } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Avatar from "react-avatar";
import "./Topics.css";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Home from "../Home/Home.jsx";

const Topics = () => {
  const [topics, setTopics] = useState([
    {
      title: <a href="https://academic.ibm.com/a2mt/downloads/capstone#/" style={{ color: 'inherit', textDecoration: 'none' }}>IBM Capstone</a>,
      content:
        "Make your final project, capstone and showcase stand out. Explore resources to kickstart your work on modern enterprise design and development.",
      category: "Technical",
      image:
        "https://swd-images.s3.jp-tok.cloud-object-storage.appdomain.cloud/Capstone.png", // Example image URL
      id: 1,
    },
    {
      title: "Artificial Intelligence",
      content:
        "We might be familiar with the idea of AI. But do we really know hot it works, how to leverage it, or what its impact might be?",
      category: "Technical",
      image:
        "https://swd-images.s3.jp-tok.cloud-object-storage.appdomain.cloud/AI.png", // Example image URL
      id: 2,
    },
    {
      title: "Data Science",
      content:"Companies collect a plethora of information-but who can analyze and activate it?",
      category: "Non-Technical",
      image:
        "https://swd-images.s3.jp-tok.cloud-object-storage.appdomain.cloud/Data%20science.png", // Example image URL
      id: 3,
    },
    {
      title: "IBM Automation",
      content:"From workflow automation to process mining, Automation enables businesses to complete routine tasks with AI powered software, and low human intervention. ",
      category: "Technical",
      image:
        "https://swd-images.s3.jp-tok.cloud-object-storage.appdomain.cloud/Automation.png", // Example image URL
      id: 4,
    },
    {
      title: "IBM Cloud",
      content: "Strategies for managing your time effectively.",
      category: "Non-Technical",
      image:
        "https://swd-images.s3.jp-tok.cloud-object-storage.appdomain.cloud/IBM%20Cloud.png", // Example image URL
      id: 5,
    },
    {
      title: "IBM Engineering",
      content: "Strategies for managing your time effectively.",
      category: "Non-Technical",
      image:
        "https://swd-images.s3.jp-tok.cloud-object-storage.appdomain.cloud/IBM%20Engineering.png", // Example image URL
      id: 6,
    },
    {
      title: "IBM Security",
      content: "Strategies for managing your time effectively.",
      category: "Non-Technical",
      image:
        "https://swd-images.s3.jp-tok.cloud-object-storage.appdomain.cloud/IBM%20Security.png", // Example image URL
      id: 7,
    },
    {
      title: "IBM Z",
      content: "Strategies for managing your time effectively.",
      category: "Non-Technical",
      image:
        "https://swd-images.s3.jp-tok.cloud-object-storage.appdomain.cloud/IBM%20Z.png", // Example image URL
      id: 8,
    },
    {
      title: "Power Systems",
      content: "Strategies for managing your time effectively.",
      category: "Non-Technical",
      image:
        "https://swd-images.s3.jp-tok.cloud-object-storage.appdomain.cloud/Power%20Systems.png", // Example image URL
      id: 9,
    },
    {
      title: "Quantum Computing",
      content: "Strategies for managing your time effectively.",
      category: "Non-Technical",
      image:
        "https://swd-images.s3.jp-tok.cloud-object-storage.appdomain.cloud/Quantum.png", // Example image URL
      id: 10,
    },
    {
      title: "Red Hat Academy",
      content: "Strategies for managing your time effectively.",
      category: "Non-Technical",
      image:
        "https://swd-images.s3.jp-tok.cloud-object-storage.appdomain.cloud/Red%20Hat%20Academy.png", // Example image URL
      id: 11,
    },
  ]);

  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicContent, setNewTopicContent] = useState("");
  const [newTopicImage, setNewTopicImage] = useState(null);
  const [newTopicCategory, setNewTopicCategory] = useState("");
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleAddTopic = () => {
    setIsAddTopicOpen(!isAddTopicOpen);
    setClicked(!clicked); // Toggle the button state
  };

  const [clicked, setClicked] = useState(false); // New state for button

  const handleAddTopic = () => {
    if (newTopicTitle && newTopicContent && newTopicCategory) {
      const newTopic = {
        title: newTopicTitle,
        content: newTopicContent,
        image: newTopicImage,
        category: newTopicCategory,
        id: Date.now(),
      };
      setTopics([...topics, newTopic]);
      setNewTopicTitle("");
      setNewTopicContent("");
      setNewTopicImage(null);
      setNewTopicCategory("");
      setIsAddTopicOpen(false);
      setLikes({ ...likes, [newTopic.id]: 0 });
      setComments({ ...comments, [newTopic.id]: [] });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTopicImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLike = (topicId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [topicId]: (prevLikes[topicId] || 0) + 1,
    }));
  };

  const handleAddComment = (topicId, commentText) => {
    if (commentText) {
      setComments((prevComments) => ({
        ...prevComments,
        [topicId]: [...(prevComments[topicId] || []), commentText],
      }));
    }
  };

  const handleExpandTopic = (topic) => {
    setExpandedTopic(topic);
  };

  const handleCloseExpandedTopic = () => {
    setExpandedTopic(null);
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  const handleCardClick = (title) => {
    if (title === "IBM Capstone") {
      window.location.href = "https://academic.ibm.com/a2mt/downloads/capstone#/";
    } else if (title === "Artificial Intelligence") {
      window.location.href = "https://academic.ibm.com/a2mt/downloads/artificial_intelligence#/";
    } else if (title === "Data Science") {
      window.location.href = "https://academic.ibm.com/a2mt/downloads/data_science#/";
    } else if (title === "IBM Automation") {
      window.location.href = "https://academic.ibm.com/a2mt/downloads/ibm_automation#/";
    }
  };

  const filteredTopics = topics.filter((topic) => {
    // Get the text content of the title, whether it's a string or React element
    const titleText = typeof topic.title === 'string' 
      ? topic.title 
      : topic.title.props.children;
      
    return filter === "" || topic.category === filter;
  }).filter((topic) => {
    if (!searchQuery) return true;
    
    // Get the text content of the title for searching
    const titleText = typeof topic.title === 'string' 
      ? topic.title 
      : topic.title.props.children;
      
    return (
      titleText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const recentTopics = topics.slice(-3).reverse();

  return (
    <div className="main-topics-container">
      <main className="topics-content">
        <div className="user-info">
          <FontAwesomeIcon icon={faBell} className="bell-icon" />
          <Avatar name="Alice" round={true} size="50" color="#0a6476" />
          {/* <span className="user-name">Alice / Backend Developer</span> */}
        </div>

        <h1 className="topics-header">IBM COURSES</h1>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          <button onClick={() => handleFilterChange("")}>All</button>
          <button onClick={() => handleFilterChange("Non-Technical")}>
            Non-Technical
          </button>
          <button onClick={() => handleFilterChange("Technical")}>
            Technical
          </button>
        </div>

        <div className="topics-container">
          {filteredTopics.length === 0 ? (
            <div className="no-posts-message">No Posts Yet</div>
          ) : (
            <div className="topics-grid">
              {filteredTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="topic-card"
                  onClick={() => handleCardClick(topic.title)}
                  style={{ cursor: topic.title === "IBM Capstone" || topic.title === "Artificial Intelligence" || topic.title === "Data Science" || topic.title === "IBM Automation" ? "pointer" : "default" }}
                  data-title={topic.title}
                >
                  {topic.image && (
                    <img
                      src={topic.image}
                      alt="Topic"
                      className="topic-image"
                    />
                  )}
                  <h2>{topic.title}</h2>
                  <p>{topic.content}</p>
                  <span
                    className={`category-label ${topic.category}`}
                  >
                    {topic.category}
                  </span>

                  <div className="actions">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(topic.id);
                      }}
                    >
                      <FaThumbsUp /> {likes[topic.id] || 0} Likes
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExpandTopic(topic);
                      }}
                    >
                      <FaComments /> {comments[topic.id]?.length || 0} Comments
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {expandedTopic && (
          <div
            className="expanded-topic-modal"
            onClick={handleCloseExpandedTopic}
          >
            <div
              className="expanded-topic-content"
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{expandedTopic.title}</h2>
              <span
                className={`category-label ${expandedTopic.category.toLowerCase()}`}
              >
                {expandedTopic.category}
              </span>
              <p>{expandedTopic.content}</p>
              {expandedTopic.image && (
                <img
                  src={expandedTopic.image}
                  alt="Expanded Topic"
                  className="expanded-topic-image"
                />
              )}

              <div className="expanded-comments-section">
                <h4>Comments</h4>
                {comments[expandedTopic.id]?.length > 0 ? (
                  comments[expandedTopic.id].map((comment, idx) => (
                    <p key={idx}>
                      <strong>Comment {idx + 1}:</strong> {comment}
                    </p>
                  ))
                ) : (
                  <p>No comments yet.</p>
                )}
                <div className="add-comment">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddComment(expandedTopic.id, e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />
                </div>
              </div>
              <button onClick={handleCloseExpandedTopic}>Close</button>
            </div>
          </div>
        )}

        {isAddTopicOpen && (
          <div className="add-topic-modal">
            <div className="add-topic-form">
              <input
                type="text"
                placeholder="Topic Title"
                value={newTopicTitle}
                onChange={(e) => setNewTopicTitle(e.target.value)}
              />
              <textarea
                placeholder="Write something about the topic..."
                value={newTopicContent}
                onChange={(e) => setNewTopicContent(e.target.value)}
              ></textarea>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />

              {/* Category selection buttons */}
              <div className="category-buttons">
                <button
                  className={newTopicCategory === "Technical" ? "selected" : ""}
                  onClick={() => setNewTopicCategory("Technical")}
                >
                  Technical
                </button>
                <button
                  className={
                    newTopicCategory === "Non-Technical" ? "selected" : ""
                  }
                  onClick={() => setNewTopicCategory("Non-Technical")}
                >
                  Non-Technical
                </button>
              </div>
              <button onClick={handleAddTopic}>Add Topic</button>
            </div>
          </div>
        )}

        <button
          className={`floating-button ${clicked ? "clicked" : ""}`}
          onClick={toggleAddTopic}
        >
          <FaPlus className={clicked ? "rotated" : ""} />
        </button>
      </main>
    </div>
  );
};
export default Topics;
