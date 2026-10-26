import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const url = category
          ? `${import.meta.env.VITE_API}/projects?category=${encodeURIComponent(category)}`
          : `${import.meta.env.VITE_API}/projects`;

        const response = await fetch(url);
        const data = await response.json();

        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }

    fetchProjects();
  }, [category]);

  return (
    <main className="projects-page">
      <Link to="/">← Home</Link>

      <h1>{category || "All Projects"}</h1>

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

      {projects.length === 0 && <p>No projects found in this category yet.</p>}
    </main>
  );
}
