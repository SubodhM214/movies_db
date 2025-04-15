import mysql from "mysql2/promise";

// connect to MySQL server
let db;

try {
  db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "abcd1234#",
    database: "movie_db",
  });

  console.log("Connected to MySQL server.");
} catch (error) {
  console.log("not connected:", err);
}

export default db;
