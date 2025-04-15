import express from "express";
import movieRouter from "./routes/movies.js";
import cors from "cors";
import loginRouter from "./routes/login.js";
import signupRouter from "./routes/signup.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/movieapi/movies", movieRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
