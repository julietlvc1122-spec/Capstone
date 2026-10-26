import { Routes, Route, Link, useLocation } from "react-router";
import Register from "./Auth/Register.jsx";
import Login from "./Auth/login.jsx";
import "./App.css";
import { useState, useEffect } from "react";
import ProjectDetails from "./projectDetails.jsx";
import {
  House,
  Boxes,
  Utensils,
  Sprout,
  Armchair,
  Gamepad2,
  PawPrint,
  Gift,
  LogOut,
} from "lucide-react";
import ProjectsPage from "./projectsPage.jsx";
import { useAuth } from "./Auth/AuthContext.jsx";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const location = useLocation();
  const { user, logout } = useAuth();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
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
    <div className={`app ${menuOpen ? "menu-open" : ""}`}>
      <header className="top-bar">
        <button
          className="icon-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <Link className="logo" to="/">
          <img
            src="/Stumped-Logo.png"
            alt="Stumped tree stump"
            className="logo-icon"
          />
          <span className="title-logo">Stumped</span>
        </Link>
        <Link className="hello-user-link" to="/account">
          {user && <p className="welcome-message">Hello, {user.username}!</p>}
        </Link>
        {isAuthPage ? (
          <Link className="account-link" to="/">
            <House size={20} strokeWidth={1.8} />
            Home
          </Link>
        ) : (
          <Link className="account-link" to="/register">
            ♙ Account
          </Link>
        )}
      </header>

      {menuOpen && (
        <aside className="side-menu open">
          <button className="close-button" onClick={() => setMenuOpen(false)}>
            Close ×
          </button>

          <h2>Explore</h2>

          <Link to="/" onClick={() => setMenuOpen(false)}>
            <House size={20} strokeWidth={1.8} />
            All Projects
          </Link>

          <Link
            to="/projects?category=Small%20Furniture"
            onClick={() => setMenuOpen(false)}
          >
            <Armchair size={20} strokeWidth={1.8} />
            Small Furniture
          </Link>

          <Link
            to="/projects?category=Garden%20and%20plants"
            onClick={() => setMenuOpen(false)}
          >
            <Sprout size={20} strokeWidth={1.8} />
            Garden &amp; Plants
          </Link>

          <Link
            to="/projects?category=Kitchen%20and%20Dining"
            onClick={() => setMenuOpen(false)}
          >
            <Utensils size={20} strokeWidth={0.8} />
            Kitchen &amp; Dining
          </Link>

          <Link
            to="/projects?category=Storage%20and%20Organization"
            onClick={() => setMenuOpen(false)}
          >
            <Gift size={20} strokeWidth={1.8} />
            Storage &amp; Organization
          </Link>
          {user && (
            <button className="logout-button" onClick={logout}>
              <LogOut size={20} strokeWidth={1.8} />
              Logout
            </button>
          )}
        </aside>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <main className="main-content">
              <section className="welcome">
                <p className="eyebrow">YOUR NEXT BUILD STARTS HERE</p>
                <h1>Find your next project.</h1>
                <p>
                  Small builds. Big inspiration. Let's make something with wood.
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
          }
        />

        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
