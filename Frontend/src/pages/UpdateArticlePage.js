import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateArticlePage() {
  const { type } = useParams();
  const articleType = type.toUpperCase() ;
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);

  useEffect(() => {
    loadRows();
  }, []);

const loadRows = async () => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/articles/${articleType}`
    );

    setRows(res.data);
  } catch (error) {
    console.log(error);
    alert("Unable to load rows");
  }
};



const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const saveTable = async () => {
    try {
      for (let row of rows) {
        await axios.put(
          `http://localhost:8080/api/articles/${row.id}`,
          row
        );
      }

      alert("Updated Successfully");
      navigate(`/article-detail/${type}`);
    } catch (error) {
      alert("Update Failed");
    }
  };

  const grammarCases = [
    "Nominative",
    "Akkusative",
    "Dative",
    "Genitive"
  ];

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <div style={styles.topBar}>
          <button
            style={styles.backBtn}
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          <h1 style={styles.heading}>
            Update {type} Table
          </h1>

          <button
            style={styles.saveBtn}
            onClick={saveTable}
          >
            Save
          </button>
        </div>

        <div style={styles.card}>
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
                <tr key={row.id}>
                  <td style={styles.caseTd}>
                    {grammarCases[index]}
                  </td>

                  <td style={styles.td}>
                    <input
                      style={styles.input}
                      value={row.masculine}
                      onChange={(e) =>
                        handleChange(index, "masculine", e.target.value)
                      }
                    />
                  </td>

                  <td style={styles.td}>
                    <input
                      style={styles.input}
                      value={row.feminine}
                      onChange={(e) =>
                        handleChange(index, "feminine", e.target.value)
                      }
                    />
                  </td>

                  <td style={styles.td}>
                    <input
                      style={styles.input}
                      value={row.neuter}
                      onChange={(e) =>
                        handleChange(index, "neuter", e.target.value)
                      }
                    />
                  </td>

                  <td style={styles.td}>
                    <input
                      style={styles.input}
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
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#0f172a,#1e293b,#334155,#0f172a)",
    padding: "40px 20px"
  },

  container: {
    maxWidth: "1300px",
    margin: "auto"
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },

  heading: {
    color: "white",
    fontSize: "38px",
    fontWeight: "800"
  },

  backBtn: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "12px",
    background: "#dc2626",
    color: "white",
    fontWeight: "700",
    cursor: "pointer"
  },

  saveBtn: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "12px",
    background: "#2563eb",
    color: "white",
    fontWeight: "700",
    cursor: "pointer"
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    borderRadius: "22px",
    overflow: "hidden",
    backdropFilter: "blur(14px)"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  th: {
    background: "#2563eb",
    color: "white",
    padding: "18px",
    textAlign: "left"
  },

  td: {
    padding: "14px"
  },

  caseTd: {
    padding: "18px",
    color: "#22c55e",
    fontWeight: "700"
  },

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none"
  }
};

export default UpdateArticlePage;