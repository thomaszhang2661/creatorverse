import React, { useState } from "react";

function Card({ creator, onEdit, onDelete, onView }) {
  const { name, url, description, imageURL } = creator;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`creator-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-header">
        {imageURL ? (
          <div className="creator-image">
            <img src={imageURL} alt={name} />
          </div>
        ) : (
          <div className="creator-image-placeholder">
            <span>🎬</span>
          </div>
        )}
        <div className="creator-badge">Creator</div>
      </div>

      <div className="creator-info">
        <h3 className="creator-name">{name}</h3>
        <p className="creator-description">{description}</p>

        {url && (
          <div className="creator-link-container">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="creator-link"
            >
              🌐 Visit Channel
            </a>
          </div>
        )}
      </div>

      <div className="creator-actions">
        <button
          className="btn btn-primary action-btn"
          onClick={() => onView(creator)}
        >
          👁️ View Details
        </button>
        <button
          className="btn btn-secondary action-btn"
          onClick={() => onEdit(creator)}
        >
          ✏️ Edit
        </button>
        <button
          className="btn btn-danger action-btn"
          onClick={() => onDelete(creator)}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
