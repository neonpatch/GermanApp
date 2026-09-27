import { useNavigate } from "react-router-dom";
import "./HomeLanding.css";

function GermanAppHomePage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="overlay">

        <h1 className="main-title">German Learning Hub</h1>
        <p className="subtitle">
          Dictionary, Article Tables and upcoming learning games in one place.
        </p>

        <div className="card-grid">

          <div className="landing-card">
            <div className="icon">📘</div>
            <h2>German Dictionary</h2>
            <p>Search, add, update and manage German vocabulary words.</p>

            <button
              className="green-btn"
              onClick={() => navigate("/dictionary")}
            >
              Open Dictionary
            </button>
          </div>

          <div className="landing-card">
            <div className="icon">📋</div>
            <h2>Article Tables</h2>
            <p>Open THE / EIN / DEIN tables and update rows.</p>

            <button
              className="blue-btn"
              onClick={() => navigate("/article-home")}
            >
              Open Tables
            </button>
          </div>

          <div className="landing-card">
            <div className="icon">🎮</div>
            <h2>Article Game</h2>
            <p>Coming soon - practice articles with quiz challenges.</p>

            <button className="purple-btn">
              Coming Soon
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default GermanAppHomePage;