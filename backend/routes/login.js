import express from "express";
import db from "../db/db.js";
const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Login route hit");
  console.log("Request body:", req.body);
  const sql = "select * from users WHERE email =? and password =?";
  try {
    const [rows] = await db.execute(sql, [req.body.email, req.body.password]);
    console.log("SQL result:", rows);

    if (rows.length > 0) {
      return res.json({ message: "Success" });
    } else {
      return res.json({ message: "Fail" });
    }
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ message: "error", error: err.message });
  }
});
export default router;
