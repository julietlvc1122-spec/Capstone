import db from "./client.js";
import bcrypt from "bcrypt";
// can select difficulty & category of projects presented to you
// if both are selected in either order then the db must find projects that match
export async function getProjects(difficulty, category) {
  let SQL = `SELECT projects.* ,categories.name AS category_name
  FROM projects 
  JOIN categories 
  ON projects.category_id = categories.id`;
  const conditions = [];
  const params = [];

  if (difficulty) {
    params.push(difficulty);
    conditions.push(`projects.difficulty = $${params.length}`);
  }
  if (category) {
    params.push(category);
    conditions.push(`categories.name = $${params.length}`);
  }
  if (conditions.length > 0) {
    SQL += ` WHERE ${conditions.join("AND")}`;
  }
  const { rows } = await db.query(SQL, params);
  return rows;
}
// getting one project
export async function getOneProject(id) {
  const SQL = `SELECT
      projects.*,

      (
        SELECT json_agg(
          json_build_object(
            'id', materials.id,
            'name', materials.name,
            'quantity', project_materials.quantity
          )
        )
        FROM project_materials
        JOIN materials
        ON project_materials.material_id = materials.id
        WHERE project_materials.project_id = projects.id
      ) AS materials,

      (
        SELECT json_agg(
          json_build_object(
            'id', tools.id,
            'name', tools.name
          )
        )
        FROM project_tools
        JOIN tools
        ON project_tools.tool_id = tools.id
        WHERE project_tools.project_id = projects.id
      ) AS tools

    FROM projects
    WHERE projects.id = $1
  `;

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
export async function deleteFavorite(user_id, project_id) {
  const SQL = `DELETE FROM favorites
      WHERE user_id = $1 AND project_id = $2
      RETURNING *;`;
  const { rows } = await db.query(SQL, [user_id, project_id]);
  return rows[0];
}
// user should be able to see all favorited posts
export async function getFavorites(user_id) {
  const SQL = `SELECT projects.* 
  FROM favorites 
  JOIN projects ON favorites.project_id = projects.id
   WHERE favorites.user_id=$1;`;
  const { rows } = await db.query(SQL, [user_id]);
  return rows;
}
export async function getUserByEmail(email) {
  const SQL = ` SELECT * FROM users WHERE email = $1`;
  const { rows } = await db.query(SQL, [email]);
  return rows[0];
}
