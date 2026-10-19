import express from "express";
import db from "./client.js";
import { getProjects, getOneProject } from "./queries.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Woodworking capstone API is running!");
});
app.get("/api/projects", async (req, res) => {
  const difficulty = req.query.difficulty;
  const category = req.query.catgeory;
  const projects = await getProjects(difficulty, category);
  res.send(projects);
});
app.get("/api/projects/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).send("Project Id must be a number");
  }
  const project = await getOneProject(id);
  if (!project) {
    return res.status(404).send("Project not found");
  }
  return res.status(200).send(project);
});

export default app;
