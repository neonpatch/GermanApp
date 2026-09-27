import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ArticleListPage() {
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadTypes();
  }, []);

  const loadTypes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/articles/types");
      setTypes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        German Article Tables
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        {types.map((type, index) => (
          <div
            key={index}
            onClick={() => navigate(`/article/${type}`)}
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              cursor: "pointer",
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            }}
          >
            {type}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticleListPage;