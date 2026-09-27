import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ArticleTablePage() {
  const [tables, setTables] = useState([]);
  const navigate = useNavigate();

  const loadTables = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/articles/types");
      setTables(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTables();
  }, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>German Article Tables</h1>

      <div style={styles.topButtons}>
        <button onClick={() => navigate("/add-article")} style={styles.btn}>
          Add Table
        </button>

        <button style={styles.btn}>Update Table</button>
        <button style={styles.deleteBtn}>Delete Table</button>
      </div>

      <div style={styles.grid}>
        {tables.map((item, index) => (
          <div
            key={index}
            style={styles.card}
            onClick={() => navigate(`/article/${item.tableType}`)}
          >
            <h2>{item.tableType}</h2>
            <p>{item.englishWord}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    padding: "40px",
    color: "white"
  },
  title: {
    textAlign: "center",
    marginBottom: "30px"
  },
  topButtons: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    marginBottom: "35px"
  },
  btn: {
    padding: "12px 22px",
    border: "none",
    background: "#2563eb",
    color: "white",
    borderRadius: "10px",
    cursor: "pointer"
  },
  deleteBtn: {
    padding: "12px 22px",
    border: "none",
    background: "#dc2626",
    color: "white",
    borderRadius: "10px",
    cursor: "pointer"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px"
  },
  card: {
    background: "white",
    color: "#111",
    padding: "25px",
    borderRadius: "14px",
    cursor: "pointer",
    textAlign: "center"
  }
};

export default ArticleTablePage;