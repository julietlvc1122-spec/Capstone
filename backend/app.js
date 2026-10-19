import express from "express";
import db from "./client.js";
import bcrypt from "bcrypt";
import {
  getProjects,
  getOneProject,
  createUser,
  getUserByEmail,
  addFavorite,
} from "./queries.js";

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
// unique contraint 23505 means there is a duplicate username or email
app.post("/api/users", async (req, res) => {
  const { username, email, password } = req.body ?? {};
  if (!username || !email || !password) {
    return res.status(400).json({
      error: "Username, email and password are required",
    });
  }
  try {
    const user = await createUser(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        error: "Username or email already exists.",
      });
    }
    console.error(error);
    res.status(500).json({ error: "Unable to create user." });
  }
});
app.post("/api/favorites", async (req, res) => {
  const { userId, projectId } = req.body;
  const favorite = await addFavorite(userId, projectId);
  res.status(201).json(favorite);
});
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }
    const passwordMatches = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatches) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }
    const { id, username, email: userEmail } = user;
    return res.status(200).json({
      id,
      username,
      email: userEmail,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Unable to log in.",
    });
  }
});
export default app;
