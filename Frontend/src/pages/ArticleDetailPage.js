import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ArticleDetailPage() {
  const { type } = useParams();
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);

  const grammarCases = [
    "Nominative",
    "Akkusative",
    "Dative",
    "Genitive"
  ];

  useEffect(() => {
    loadRows();
  }, [type]);

  const loadRows = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/articles/${type}`
      );
      setRows(res.data);
    } catch (error) {
      console.log(error);
      alert("Unable to load article table");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Top Header */}
        <div style={styles.topBar}>
          <button
            style={styles.backBtn}
            onClick={() => navigate("/article-home")}
          >
            ← Back
          </button>

          <h1 style={styles.heading}>{type} Article Table</h1>

          <button
            style={styles.addBtn}
            onClick={() => navigate(`/update-article/${type}`)}
>
              Update Table
          </button>
        </div>

        {/* Table */}
        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Grammar Case</th>
                <th style={styles.th}>Masculine</th>
                <th style={styles.th}>Feminine</th>
                <th style={styles.th}>Neuter</th>
                <th style={styles.th}>Plural</th>
              </tr>
            </thead>

            <tbody>
              {rows.length > 0 ? (
                rows.map((r, index) => (
                  <tr key={r.id}>
                    <td style={styles.caseTd}>
                      {grammarCases[index] || "-"}
                    </td>

                    <td style={styles.td}>{r.masculine}</td>
                    <td style={styles.td}>{r.feminine}</td>
                    <td style={styles.td}>{r.neuter}</td>
                    <td style={styles.td}>{r.plural}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={styles.empty}>
                    No rows found
                  </td>
                </tr>
              )}
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
    gap: "15px",
    flexWrap: "wrap",
    marginBottom: "30px"
  },

  heading: {
    color: "white",
    fontSize: "38px",
    fontWeight: "800",
    margin: 0,
    textTransform: "capitalize"
  },

  backBtn: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#dc2626,#ef4444)",
    color: "white",
    fontWeight: "700",
    cursor: "pointer"
  },

  addBtn: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#16a34a,#22c55e)",
    color: "white",
    fontWeight: "700",
    cursor: "pointer"
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "22px",
    backdropFilter: "blur(14px)",
    overflow: "hidden",
    boxShadow: "0 20px 45px rgba(0,0,0,.35)"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  th: {
    background: "#2563eb",
    color: "white",
    padding: "18px",
    fontSize: "16px",
    textAlign: "left"
  },

  caseTd: {
    padding: "18px",
    color: "#22c55e",
    fontWeight: "700",
    borderBottom: "1px solid rgba(255,255,255,0.08)"
  },

  td: {
    padding: "18px",
    color: "white",
    borderBottom: "1px solid rgba(255,255,255,0.08)"
  },

  empty: {
    padding: "30px",
    textAlign: "center",
    color: "#cbd5e1"
  }
};

export default ArticleDetailPage;