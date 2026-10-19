import express from "express";
import {
  getProjects,
  getOneProject,
  createUser,
  getUserByEmail,
  addFavorite,
  deleteFavorite,
  getFavorites,
} from "./queries.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { requireAuth } from "./Authenticate.js";

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
// user should see Their own favorites if they have favorite posts and they are authenticated
app.get("/api/favorites", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await getFavorites(userId);
    return res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "There are no favorites to retrive",
    });
  }
});
app.post("/api/favorites", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const { projectId } = req.body;
  if (!projectId || !Number.isInteger(projectId)) {
    return res.status(400).json({
      error: "A valid projectID is requried.",
    });
  }
  try {
    const favorite = await addFavorite(userId, projectId);
    return res.status(201).json(favorite);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        error: "You have already favorited this project.",
      });
    }
    console.error(error);
    return res.status(500).json({
      error: "Unable to add favorite.",
    });
  }
});

app.delete("/api/favorites/:projectId", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const projectId = Number(req.params.projectId);
  if (!Number.isInteger(projectId) || projectId <= 0) {
    return res.status(400).json({
      error: "A valid project ID is required.",
    });
  }
  try {
    const favorite = await deleteFavorite(userId, projectId);
    if (!favorite) {
      return res.status(404).json({
        error: "Favorite not found.",
      });
    }
    return res.status(200).json({
      message: "Favorite removed successfully.",
      favorite,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Unable to remove favorite.",
    });
  }
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
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    return res.status(200).json({
      id,
      username,
      email: userEmail,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Unable to log in.",
    });
  }
});
app.get("/api/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});
export default app;
