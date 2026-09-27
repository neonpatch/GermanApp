import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateArticleType() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tableType: "",
    englishWord: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const saveType = async () => {
    if (!form.tableType || !form.englishWord) {
      alert("Fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/articles", {
        tableType: form.tableType,
        englishWord: form.englishWord,
        grammerCase: "",
        masculine: "",
        feminine: "",
        neuter: "",
        plural: ""
      });

      navigate("/article-table");
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Article Type</h1>

        <input
          style={styles.input}
          name="tableType"
          placeholder="Article Name (DEIN)"
          onChange={handleChange}
        />

        <input
          style={styles.input}
          name="englishWord"
          placeholder="Meaning (Your / Possessive)"
          onChange={handleChange}
        />

        <button style={styles.button} onClick={saveType}>
          Create
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to right,#07152f,#142850)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    background: "white",
    padding: "40px",
    width: "420px",
    borderRadius: "18px"
  },
  title: {
    textAlign: "center",
    marginBottom: "25px"
  },
  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #ddd"
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default CreateArticleType;