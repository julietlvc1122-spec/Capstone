import db from "./client.js";
import bcrypt from "bcrypt";
// can select difficulty & category of projects presented to you
// if both are selected in either order then the db must find projects that match
export async function getProjects(difficulty, category) {
  let SQL = `SELECT projects.* 
  FROM projects 
  JOIN categories 
  ON projects.category_id = categories.id`;
  const conditions = [];
  const params = [];
  if (difficulty) {
    SQL += ` WHERE difficulty = $1`;
    params.push(difficulty);
  }
  if (category) {
    params.push(category);
    conditions.push(`categories.name = $${params.length}`);
  }
  if (conditions.length > 0) {
    SQL += `WHERE ${conditions.join("AND")}`;
  }
  const { rows } = await db.query(SQL, params);
  return rows;
}
// getting one project
export async function getOneProject(id) {
  const SQL = `SELECT * FROM projects WHERE id =$1`;
  const { rows } = await db.query(SQL, [id]);
  return rows[0];
}
export async function createUser(username, email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const SQL = ` INSERT INTO users (username, email, password_hash)
    VALUES($1,$2,$3)
    RETURNING id, username, email;`;
  const { rows } = await db.query(SQL, [username, email, passwordHash]);
  return rows[0];
}

export async function addFavorite(user_id, project_id) {
  const SQL = `INSERT INTO favorites (user_id, project_id)
    Values($1,$2)
    RETURNING *;`;
  const { rows } = await db.query(SQL, [user_id, project_id]);
  return rows[0];
}
export async function getUserByEmail(email) {
  const SQL = ` SELECT * FROM users WHERE email = $1`;
  const { rows } = await db.query(SQL, [email]);
  return rows[0];
}
