import db from "./client.js";

await db.connect();
await seed();
console.log("🌱 Database seeded.");
async function seed() {
  await db.query(`
       INSERT INTO categories (name)
       VALUES 
       ('Home decor'),
       ('Storage and Organization'),
       ('Kitchen and Dining'),
       ('Garden and plants'),
       ('Small Furniture'),
       ('Games and Hobbies'),
       ('Pet Projects'),
       ('Personalized Gifts')
       `);
  await db.query(`
    INSERT INTO tools (name)
    VALUES
    ('Hand Saw'),
    ('Power Drill'),
    ('Hammer'),
    ('Measuring tape'),
    ('Screwdriver'),
    ('Clamps'),
    ('Wood Chisel'),
    ('Jigsaw')
    `);
  await db.query(`
        INSERT INTO materials (name)
        VALUES
        ('Pine Wood'),
        ('Sand Paper'),
        ('Plywood'),
        ('Wood Stain '),
        ('Nails'),
        ('Wood Glue'),
        ('Paint '),
        ('Drawer Handles '),
        ('Metal Brackets'),
        ('Bolts and Nuts'),
        ('Wood screws')
        `);
  await db.query(`
   INSERT INTO projects (title, description, difficulty, instructions, image_url, creator_id, category_id)
    VALUES ('Wooden Picture Frame', 'A simple wooden frame for your favorite photo', 'Beginner',
    '1. Measure your photo. 2. Cut four pieces of wood. 3. Join the corners. 4. Sand and finish the frame.',
      'https://images.pexels.com/photos/8059662/pexels-photo-8059662.jpeg',
      NULL,
      (SELECT id FROM categories WHERE name = 'Home decor')
    ),
    (
      'Small Wooden Birdhouse',
      'A charming birdhouse for your garden or backyard.',
      'Beginner',
      '1. Cut the wooden panels. 2. Drill an entrance hole. 3. Assemble the panels. 4. Attach the roof.',
      'https://images.pexels.com/photos/14118082/pexels-photo-14118082.jpeg',
      NULL,
      (SELECT id FROM categories WHERE name = 'Garden and plants')
    ),
    (
      'Wooden Desk Organizer',
      'A compact organizer for pens, notebooks, and other desk supplies.',
      'Beginner',
      '1. Measure and cut the base and dividers. 2. Sand the edges. 3. Glue the pieces together. 4. Apply a finish.',
      'https://images.pexels.com/photos/2587993/pexels-photo-2587993.jpeg',
      NULL,
      (SELECT id FROM categories WHERE name = 'Storage and Organization')
    ),
    (
      'Wooden Serving Tray',
      'A practical serving tray with handles for carrying drinks and snacks.',
      'Intermediate',
      '1. Cut the base and sides. 2. Sand all pieces. 3. Attach the sides and handles. 4. Apply a food-safe finish.',
      'https://images.pexels.com/photos/34504840/pexels-photo-34504840.jpeg',
      NULL,
      (SELECT id FROM categories WHERE name = 'Kitchen and Dining')
    ),
    (
      'Small Wooden Side Table',
      'A compact table for a bedroom, living room, or reading corner.',
      'Intermediate',
      '1. Cut the tabletop and legs. 2. Assemble the legs and supports. 3. Attach the tabletop. 4. Sand and finish.',
      'https://images.pexels.com/photos/6266186/pexels-photo-6266186.jpeg',
      NULL,
      (SELECT id FROM categories WHERE name = 'Small Furniture')
    );
`);
  await db.query(`
    INSERT INTO project_tools (project_id, tool_id)
    VALUES 
    (
      (SELECT id FROM projects WHERE title = 'Small Wooden Birdhouse'),
      (SELECT id FROM tools WHERE name  = 'Hand Saw')
    ),
    (
      (SELECT id FROM projects WHERE title = 'Small Wooden Birdhouse'),
      (SELECT id FROM tools WHERE name  = 'Screwdriver')
    ),
    (
     (SELECT id FROM projects WHERE title = 'Small Wooden Birdhouse'),
     (SELECT id FROM tools WHERE name  = 'Power Drill')
    ),
    (
     (SELECT id FROM projects WHERE title = 'Wooden Desk Organizer'),
     (SELECT id FROM tools WHERE name = 'Hand Saw')
    ),
    (
     (SELECT id FROM projects WHERE title = 'Wooden Desk Organizer'),
     (SELECT id FROM tools WHERE name  = 'Power Drill')
    ),
    (
     (SELECT id FROM projects WHERE title = 'Wooden Desk Organizer'),
     (SELECT id FROM tools WHERE name  = 'Measuring tape')
    ),
    (
     (SELECT id FROM projects WHERE title = 'Wooden Desk Organizer'),
     (SELECT id FROM tools WHERE name  = 'Screwdriver')
    ),
    (
     (SELECT id FROM projects WHERE title = 'Wooden Picture Frame'),
     (SELECT id FROM tools WHERE name  = 'Clamps')
    ),
    (
     (SELECT id FROM projects WHERE title = 'Wooden Picture Frame'),
     (SELECT id FROM tools WHERE name  = 'Measuring tape')
    ),
    ( 
     (SELECT id FROM projects WHERE title = 'Wooden Serving Tray'),
     (SELECT id FROM tools WHERE name  = 'Measuring tape')
    ),
    (
     (SELECT id FROM projects WHERE title = 'Wooden Serving Tray'),
     (SELECT id FROM tools WHERE name  = 'Power Drill')
    ),
    (
     (SELECT id FROM projects WHERE title = 'Wooden Serving Tray'),
     (SELECT id FROM tools WHERE name  = 'Hand Saw')
    ),
    (
     (SELECT id FROM projects WHERE title = 'Small Wooden Side Table'),
     (SELECT id FROM tools WHERE name  = 'Measuring tape')
    ),
    (
     (SELECT id FROM projects WHERE title = 'Small Wooden Side Table'),
     (SELECT id FROM tools WHERE name  = 'Power Drill')
    ),
    (
     (SELECT id FROM projects WHERE title = 'Small Wooden Side Table'),
     (SELECT id FROM tools WHERE name  = 'Screwdriver')
    ),
    (
     (SELECT id FROM projects WHERE title = 'Small Wooden Side Table'),
     (SELECT id FROM tools WHERE name  = 'Hand Saw')
    );
    `);
}
await db.end();
