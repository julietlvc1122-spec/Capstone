import app from "./app.js";
import db from "./client.js";

const PORT = 3000;
await db.connect();

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
