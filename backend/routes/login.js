import express from "express";
import db from "../db/db.js";
const router = express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const key = "SECRET_KEY";

router.post("/", async (req, res) => {
  // console.log("Request body:", req.body);
  const sql = "select * from users WHERE email =?";
  try {
    const [rows] = await db.execute(sql, [req.body.email]);
    console.log("result:", rows);
    if (rows.length === 0) {
      return res.json({ message: "Invalid email or password" });
    }
    const user = rows[0];
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    } else {
      //token

      const token = jwt.sign({ email: user.email }, key, { expiresIn: "1h" });
      return res.json({ message: "Success", token });
    }
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ message: "error", error: err.message });
  }
});
export default router;
