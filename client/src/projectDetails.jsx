import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

export default function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}/projects/${id}`,
        );

        const data = await response.json();

        setProject(data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    }

    fetchProject();
  }, [id]);

  if (!project) {
    return <p>Loading project...</p>;
  }

  return (
    <main className="project-details">
      <Link to="/">← Back to projects</Link>

      {project.image_url && <img src={project.image_url} alt={project.title} />}

      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <p>Difficulty: {project.difficulty}</p>
      <h2>Instructions</h2>
      <p>{project.instructions}</p>
    </main>
  );
}
