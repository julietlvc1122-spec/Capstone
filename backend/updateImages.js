import db from "./client.js";

await db.connect();

async function updateImages() {
  const projects = [
    {
      title: "Wooden Picture Frame",
      image_url:
        "https://images.pexels.com/photos/8059662/pexels-photo-8059662.jpeg",
    },
    {
      title: "Small Wooden Birdhouse",
      image_url:
        "https://images.pexels.com/photos/14118082/pexels-photo-14118082.jpeg",
    },
    {
      title: "Wooden Desk Organizer",
      image_url:
        "https://images.pexels.com/photos/2587993/pexels-photo-2587993.jpeg",
    },
    {
      title: "Wooden Serving Tray",
      image_url:
        "https://images.pexels.com/photos/34504840/pexels-photo-34504840.jpeg",
    },
    {
      title: "Small Wooden Side Table",
      image_url:
        "https://images.pexels.com/photos/6266186/pexels-photo-6266186.jpeg",
    },
  ];

  for (const project of projects) {
    await db.query(
      `
        UPDATE projects
        SET image_url = $1
        WHERE title = $2;
      `,
      [project.image_url, project.title],
    );
  }

  console.log("Project images updated!");
}

try {
  await updateImages();
} catch (error) {
  console.error("Error updating project images:", error);
} finally {
  await db.end();
}
