import { Link } from "react-router";
import { useAuth } from "./Auth/AuthContext.jsx";
import { useState, useEffect } from "react";

export default function Account() {
  const { user, token } = useAuth();
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    async function fetchFavorites() {
      const response = await fetch(`${import.meta.env.VITE_API}/favorites/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch favorites");
      }
      const data = await response.json();
      setFavorites(data);
    }
    if (token) {
      fetchFavorites();
    }
  }, [token]);

  return (
    <main className="account-page">
      <Link className="home-link" to="/">
        ← Home
      </Link>
      <h1>My Account</h1>
      <p>Welcome back, {user ? user.username : "builder"}!</p>
      {user && (
        <div className="profile-info">
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <section className="liked-projects">
            <h2>Projects I've Liked</h2>
            {favorites.length === 0 ? (
              <p>You haven't liked any projects yet.</p>
            ) : (
              <div className="project-feed">
                {favorites.map((project) => (
                  <Link
                    to={`/projects/${project.id}`}
                    className="project-card"
                    key={project.id}
                  >
                    {project.image_url && (
                      <div className="project-image-container">
                        <img src={project.image_url} alt={project.title} />
                      </div>
                    )}
                    <h3>{project.title}</h3>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
