import express from "express";
import db from "../db/db.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const [list] = await db.execute("SELECT * FROM movies");
  res.json(list);
});

router.get("/search", async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.json([]);
  }

  const query = `
    SELECT DISTINCT m.*
    FROM movies m
    LEFT JOIN movie_actors ma ON m.id = ma.movie_id
    LEFT JOIN actors a ON ma.actor_id = a.id
    WHERE m.title LIKE ? 
       OR m.director LIKE ? 
       OR m.genre LIKE ? 
       OR a.name LIKE ?
       OR m.release_year = ?
  `;

  const year = isNaN(q) ? null : parseInt(q);

  try {
    const [movies] = await db.execute(query, [
      `%${q}%`,
      `%${q}%`,
      `%${q}%`,
      `%${q}%`,
      year,
    ]);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
