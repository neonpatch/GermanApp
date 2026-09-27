import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddArticlePage() {
  const navigate = useNavigate();

  const [articleType, setArticleType] = useState("");
  const [englishWord, setEnglishWord] = useState("");

  const [rows, setRows] = useState([
    {
      grammarCase: "Nominative",
      masculine: "",
      feminine: "",
      neuter: "",
      plural: ""
    },
    {
      grammarCase: "Accusative",
      masculine: "",
      feminine: "",
      neuter: "",
      plural: ""
    },
    {
      grammarCase: "Dative",
      masculine: "",
      feminine: "",
      neuter: "",
      plural: ""
    },
    {
      grammarCase: "Genitive",
      masculine: "",
      feminine: "",
      neuter: "",
      plural: ""
    }
  ]);

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const saveTable = async () => {
    try {
      if (!articleType.trim() || !englishWord.trim()) {
        alert("Enter Article Type and English Word");
        return;
      }

      for (const row of rows) {
        const payload = {
          articleType: articleType.trim(),
          englishWord: englishWord.trim(),
          grammarCase: row.grammarCase.trim(),
          masculine: row.masculine.trim(),
          feminine: row.feminine.trim(),
          neuter: row.neuter.trim(),
          plural: row.plural.trim()
        };

        console.log("Sending:", payload);

        await axios.post(
          "http://localhost:8080/api/articles",
          payload,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      }

      alert("Table Saved Successfully");
      navigate("/article-home");

    } catch (error) {
      console.log("Error:", error);
      console.log("Backend Response:", error.response?.data);
      alert("Save Failed - Check Browser Console");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Add German Article Table</h1>

        <input
          style={styles.input}
          placeholder="Article Type (THE / A / DEIN)"
          value={articleType}
          onChange={(e) => setArticleType(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="English Word (the / a / your)"
          value={englishWord}
          onChange={(e) => setEnglishWord(e.target.value)}
        />

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Case</th>
              <th style={styles.th}>Masculine</th>
              <th style={styles.th}>Feminine</th>
              <th style={styles.th}>Neuter</th>
              <th style={styles.th}>Plural</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td style={styles.caseCell}>{row.grammarCase}</td>

                <td>
                  <input
                    style={styles.cellInput}
                    value={row.masculine}
                    onChange={(e) =>
                      handleChange(index, "masculine", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    style={styles.cellInput}
                    value={row.feminine}
                    onChange={(e) =>
                      handleChange(index, "feminine", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    style={styles.cellInput}
                    value={row.neuter}
                    onChange={(e) =>
                      handleChange(index, "neuter", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    style={styles.cellInput}
                    value={row.plural}
                    onChange={(e) =>
                      handleChange(index, "plural", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button style={styles.button} onClick={saveTable}>
          Save Full Table
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#021024,#0b1f45)",
    padding: "40px"
  },

  card: {
    maxWidth: "1100px",
    margin: "auto",
    background: "#ffffff",
    borderRadius: "18px",
    padding: "35px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.25)"
  },

  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "34px",
    color: "#0f172a"
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "15px"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px",
    marginBottom: "25px"
  },

  th: {
    background: "#2563eb",
    color: "white",
    padding: "14px",
    textAlign: "center"
  },

  caseCell: {
    padding: "12px",
    fontWeight: "700",
    background: "#eff6ff",
    textAlign: "center"
  },

  cellInput: {
    width: "100%",
    padding: "10px",
    border: "1px solid #d1d5db",
    outline: "none"
  },

  button: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    background: "#16a34a",
    color: "white",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer"
  }
};

export default AddArticlePage;