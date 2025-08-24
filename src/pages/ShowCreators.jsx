import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";
import Card from "../components/Card";

function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching creators:", error);
      } else {
        setCreators(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (creator) => {
    if (window.confirm(`Are you sure you want to delete ${creator.name}?`)) {
      try {
        const { error } = await supabase
          .from("creators")
          .delete()
          .eq("id", creator.id);

        if (error) {
          console.error("Error deleting creator:", error);
        } else {
          fetchCreators(); // Refresh data
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleEdit = (creator) => {
    navigate(`/edit/${creator.id}`);
  };

  const handleView = (creator) => {
    navigate(`/view/${creator.id}`);
  };

  const handleAdd = () => {
    navigate("/add");
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="show-creators">
      <div className="header">
        <h1>💫 Creatorverse</h1>
        <p>Discover amazing content creators</p>
        <button className="btn btn-primary" onClick={handleAdd}>
          Add Creator
        </button>
      </div>

      <div className="creators-grid">
        {creators.length === 0 ? (
          <div className="no-creators">
            <p>No creators yet. Be the first to add one!</p>
          </div>
        ) : (
          creators.map((creator) => (
            <Card
              key={creator.id}
              creator={creator}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ShowCreators;
