import { Routes, Route, Link } from "react-router";
import Register from "./Auth/Register.jsx";
import Login from "./Auth/login.jsx";
import "./App.css";
import { useState, useEffect } from "react";
import ProjectDetails from "./projectDetails.jsx";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/projects`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }

    fetchProjects();
  }, []);

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

        <Link className="logo" to="/">
          Stumped
        </Link>

        <Link className="account-link" to="/register">
          <span aria-hidden="true">♙</span> Account
        </Link>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <div className={`app ${menuOpen ? "menu-open" : ""}`}>
              {menuOpen && (
                <aside className="side-menu open">
                  <button
                    className="close-button"
                    onClick={() => setMenuOpen(false)}
                  >
                    Close ×
                  </button>

                  <h2>Explore</h2>
                  <button onClick={() => setMenuOpen(false)}>
                    All Projects
                  </button>
                  <button onClick={() => setMenuOpen(false)}>Furniture</button>
                  <button onClick={() => setMenuOpen(false)}>
                    Garden &amp; Plants
                  </button>
                  <button onClick={() => setMenuOpen(false)}>
                    Kitchen &amp; Dining
                  </button>
                  <button onClick={() => setMenuOpen(false)}>
                    Personalized Gifts
                  </button>
                </aside>
              )}

              <main className="main-content">
                <section className="welcome">
                  <p className="eyebrow">YOUR NEXT BUILD STARTS HERE</p>
                  <h1>Find your next project.</h1>
                  <p>
                    Small builds. Big inspiration. Let's make something with
                    wood.
                  </p>
                </section>

                <section className="projects-section">
                  <h2>Explore projects</h2>
                  <p>Discover your next weekend creation.</p>
                </section>
                <div className="project-feed">
                  {projects.map((project) => (
                    <Link
                      to={`/projects/${project.id}`}
                      className="project-card"
                      key={project.id}
                    >
                      {project.image_url && (
                        <img src={project.image_url} alt={project.title} />
                      )}

                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <p>Difficulty: {project.difficulty}</p>
                    </Link>
                  ))}
                </div>
              </main>
            </div>
          }
        />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
