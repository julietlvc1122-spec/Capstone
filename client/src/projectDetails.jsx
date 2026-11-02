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
      {/* Back link */}
      <Link className="back-link" to="/">
        ← Back to projects
      </Link>

      {/* Photo and project information */}
      <section className="project-hero">
        {/* Left side: Project photo */}
        <div className="project-details-image-container">
          {project.image_url && (
            <img src={project.image_url} alt={project.title} />
          )}
        </div>

        {/* Right side: Project information */}
        <div className="project-info">
          <div className="orange-heading-line">
            <span>✿</span>
          </div>

          <h1>{project.title}</h1>

          <p className="project-description">{project.description}</p>
          <div className="project-difficulty">{project.difficulty}</div>
          <hr className="project-divider" />
          <div className="project-summary">
            <div className="summary-item">
              <span className="summary-icon">◷</span>

              <div>
                <h3>Project</h3>
                <p>{project.difficulty}</p>
              </div>
            </div>
            <div className="summary-item">
              <span className="summary-icon">▤</span>
              <div>
                <h3>Materials</h3>
                <p>{project.materials?.length || 0} materials</p>
              </div>
            </div>
            <div className="summary-item">
              <span className="summary-icon">⚒</span>
              <div>
                <h3>Tools</h3>
                <p>{project.tools?.length || 0} tools</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lower page content */}
      <section className="project-lower">
        {/* Instructions */}
        <div className="project-instructions">
          <div className="section-heading">
            <h2>Instructions</h2>
          </div>
          <ol className="instruction-list">
            {project.instructions?.split(". ").map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
        {/* Materials and tools */}
        <aside className="materials-card">
          <div className="section-heading">
            <h2>Materials & Tools</h2>
          </div>
          <h3>Materials</h3>
          <ul>
            {(project.materials || []).map((material) => (
              <li key={material.id}>
                {material.name}
                {material.quantity && ` — ${material.quantity}`}
              </li>
            ))}
          </ul>

          {(!project.materials || project.materials.length === 0) && (
            <p>No materials listed yet.</p>
          )}
          <hr className="project-divider" />
          <h3>Tools</h3>
          <ul>
            {(project.tools || []).map((tool) => (
              <li key={tool.id}>{tool.name}</li>
            ))}
          </ul>

          {(!project.tools || project.tools.length === 0) && (
            <p>No tools listed yet.</p>
          )}
        </aside>
      </section>
    </main>
  );
}
