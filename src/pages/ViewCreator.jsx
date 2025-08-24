import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";

function ViewCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCreator();
  }, [id]);

  const fetchCreator = async () => {
    try {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching creator:", error);
        navigate("/");
      } else {
        setCreator(data);
      }
    } catch (error) {
      console.error("Error:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${creator.name}?`)) {
      try {
        const { error } = await supabase.from("creators").delete().eq("id", id);

        if (error) {
          console.error("Error deleting creator:", error);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!creator) {
    return <div className="error">Creator not found</div>;
  }

  return (
    <div className="view-creator">
      <div className="creator-header">
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          ← Back to List
        </button>
        <h1>{creator.name}</h1>
      </div>

      <div className="creator-details">
        {creator.imageURL && (
          <div className="creator-image-large">
            <img src={creator.imageURL} alt={creator.name} />
          </div>
        )}

        <div className="creator-info">
          <h2>About {creator.name}</h2>
          <p className="description">{creator.description}</p>

          {creator.url && (
            <div className="creator-link">
              <a
                href={creator.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Visit Channel
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="creator-actions">
        <button
          className="btn btn-secondary"
          onClick={() => navigate(`/edit/${id}`)}
        >
          Edit Information
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete Creator
        </button>
      </div>
    </div>
  );
}

export default ViewCreator;
