import { useState } from "react";
import "./App.css";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      <header className="top-bar">
        <button
          className="icon-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <a className="logo" href="/">
          Timber & Twine
        </a>

        <a className="account-link" href="/register">
          <span aria-hidden="true">♙</span> Account
        </a>
      </header>

      {menuOpen && (
        <aside className={`side-menu ${menuOpen ? "open" : ""}`}>
          <button className="close-button" onClick={() => setMenuOpen(false)}>
            Close ×
          </button>

          <h2>Explore</h2>
          <button onClick={() => setMenuOpen(false)}>All Projects</button>
          <button onClick={() => setMenuOpen(false)}>Furniture</button>
          <button onClick={() => setMenuOpen(false)}>Garden & Plants</button>
          <button onClick={() => setMenuOpen(false)}>Kitchen & Dining</button>
          <button onClick={() => setMenuOpen(false)}>Personalized Gifts</button>
        </aside>
      )}

      <main className="main-content">
        <section className="welcome">
          <p className="eyebrow">YOUR NEXT BUILD STARTS HERE</p>
          <h1>Find your next project.</h1>
          <p>Small builds. Big inspiration. Let's make something with wood.</p>
        </section>

        <section className="projects-section">
          <h2>Explore projects</h2>
          <p>Discover your next weekend creation.</p>

          <div className="project-feed">
            <p className="empty-message">
              Your woodworking inspiration will appear here!
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
