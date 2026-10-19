import db from "./client.js";
// can select difficulty of projects presented to you
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
