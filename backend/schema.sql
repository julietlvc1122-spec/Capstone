CREATE TABLE users(
id SERIAL PRIMARY KEY, 
username TEXT NOT NULL UNIQUE,
email TEXT NOT NULL UNIQUE,
password_hash TEXT NOT NULL);
 
CREATE TABLE categories(
id SERIAL PRIMARY KEY,
name TEXT NOT NULL UNIQUE
 );

CREATE TABLE projects (
id SERIAL PRIMARY KEY, 
title TEXT NOT NULL, 
description TEXT NOT NULL, 
difficulty TEXT NOT NULL, 
instructions TEXT NOT NULL,
image_url TEXT, 
creator_id INTEGER REFERENCES users(id),
category_id INTEGER REFERENCES categories(id));

CREATE TABLE materials (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL UNIQUE);

CREATE TABLE project_materials(
    project_id INTEGER REFERENCES projects(id),
    material_id INTEGER REFERENCES materials(id),
    quantity INTEGER NOT NULL,
    PRIMARY KEY (project_id, material_id)
);
CREATE TABLE favorites (
    user_id INTEGER REFERENCES users(id),
    project_id INTEGER REFERENCES projects(id),
    PRIMARY KEY (user_id, project_id)
);
CREATE TABLE tools(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
)
CREATE TABLE project_tools(
    project_id INTEGER REFERENCES projects(id)
    tool_id INTEGER REFERENCES tools(id)
    PRIMARY KEY(project_id, tool_id)
)