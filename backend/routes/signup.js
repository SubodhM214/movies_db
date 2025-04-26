import express from "express";
import db from "../db/db.js";
const router = express.Router();

import bcrypt from "bcrypt";

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    const [existingUsers] = await db.execute(
      "SELECT * FROM users WHERE name = ? OR email = ?",
      [name, email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.error("Hashing error:", err);
        return res.status(500).json({ error: "Error hashing password" });
      }
      const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
      await db.execute(sql, [name, email, hash]);

      return res.status(200).json({ message: "User added successfully" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
