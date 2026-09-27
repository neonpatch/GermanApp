import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ArticleHomePage() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/articles/types");
      setArticles(res.data);
    } catch (error) {
      console.log(error);

      // fallback data
      setArticles(["THE", "A", "AN", "DEIN"]);
    }
  };

 const deleteTable = async (type) => {

  const username = prompt("Enter Username:");
  if (!username) return;

  const password = prompt("Enter Password:");
  if (!password) return;

  if (username !== "Admin" || password !== "@Admin") {
    alert("Invalid Credentials");
    return;
  }

  const ok = window.confirm(
    `Delete ${type} table permanently?`
  );

  if (!ok) return;

  await axios.delete(
    `http://localhost:8080/api/articles/type/${type}`
  );

  alert("Deleted Successfully");

  loadArticles();
};

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <div style={styles.container}>
        <h1 style={styles.heading}>German Article Tables</h1>
        <p style={styles.subHeading}>
          Manage all article references like THE, A, AN, DEIN
        </p>

        {/* Top Buttons */}
        <div style={styles.topButtons}>
          <button
            style={styles.addBtn}
            onClick={() => navigate("/add-article")}
          >
            + Add Table
          </button>

          <button
            style={styles.updateBtn}
            onClick={() => alert("Open any table then update")}
          >
            Update
          </button>

          <button
            style={styles.deleteBtn}
            onClick={() => alert("Use delete inside cards")}
          >
            Delete
          </button>
        </div>

        {/* Cards */}
        <div style={styles.grid}>
          {articles.map((item, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.badge}>ARTICLE</div>

              <h2 style={styles.cardTitle}>{item}</h2>

              <p style={styles.desc}>
                Click below to open complete table reference.
              </p>

              <div style={styles.btnArea}>
                <button
                  style={styles.openBtn}
                  onClick={() => navigate(`/article-detail/${item}`)}
                >
                  Open Table
                </button>

                <button
                  style={styles.removeBtn}
                  onClick={() => deleteTable(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
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
    padding: "50px 20px",
    position: "relative",
    overflow: "hidden"
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backdropFilter: "blur(8px)"
  },

  container: {
    maxWidth: "1300px",
    margin: "auto",
    position: "relative",
    zIndex: 2
  },

  heading: {
    textAlign: "center",
    color: "white",
    fontSize: "48px",
    fontWeight: "800",
    marginBottom: "10px"
  },

  subHeading: {
    textAlign: "center",
    color: "#cbd5e1",
    fontSize: "18px",
    marginBottom: "40px"
  },

  topButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    marginBottom: "45px",
    flexWrap: "wrap"
  },

  addBtn: {
    padding: "14px 28px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg,#16a34a,#22c55e)",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 12px 25px rgba(34,197,94,.35)"
  },

  updateBtn: {
    padding: "14px 28px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 12px 25px rgba(59,130,246,.35)"
  },

  deleteBtn: {
    padding: "14px 28px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg,#dc2626,#ef4444)",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 12px 25px rgba(239,68,68,.35)"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "28px"
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "22px",
    padding: "28px",
    backdropFilter: "blur(14px)",
    boxShadow: "0 20px 45px rgba(0,0,0,.35)",
    textAlign: "center",
    transition: "0.3s"
  },

  badge: {
    display: "inline-block",
    background: "#1e40af",
    color: "white",
    padding: "6px 12px",
    borderRadius: "30px",
    fontSize: "12px",
    fontWeight: "700",
    marginBottom: "18px"
  },

  cardTitle: {
    color: "white",
    fontSize: "34px",
    fontWeight: "800",
    marginBottom: "12px"
  },

  desc: {
    color: "#cbd5e1",
    fontSize: "15px",
    marginBottom: "25px"
  },

  btnArea: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap"
  },

  openBtn: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
    color: "white",
    fontWeight: "700",
    cursor: "pointer"
  },

  removeBtn: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#dc2626,#ef4444)",
    color: "white",
    fontWeight: "700",
    cursor: "pointer"
  }
};

export default ArticleHomePage;