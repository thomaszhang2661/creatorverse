import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";

function AddCreator() {
  const navigate = useNavigate();
  const [creator, setCreator] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreator((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { data, error } = await supabase
        .from("creators")
        .insert([creator])
        .select()
        .single();

      if (error) {
        console.error("Error adding creator:", error);
        alert("Failed to add creator. Please try again.");
      } else {
        navigate(`/view/${data.id}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add creator. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="add-creator">
      <div className="header">
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          ← Back to List
        </button>
        <h1>Add New Creator</h1>
      </div>

      <form onSubmit={handleSubmit} className="creator-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={creator.name}
            onChange={handleChange}
            required
            placeholder="Enter creator name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">Channel URL</label>
          <input
            type="url"
            id="url"
            name="url"
            value={creator.url}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={creator.description}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Describe this creator..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageURL">Profile Image URL (optional)</label>
          <input
            type="url"
            id="imageURL"
            name="imageURL"
            value={creator.imageURL}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Adding..." : "Add Creator"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCreator;
