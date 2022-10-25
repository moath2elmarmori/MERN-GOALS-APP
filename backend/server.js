const path = require("path");
const express = require("express");
const app = express();
const colors = require("colors");
const cors = require("cors");
const dotnev = require("dotenv").config();
const connectDb = require("./config/db");
const goalsRoutes = require("./routes/goalsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const { errorMiddlewareHnadler } = require("./middleware/errorMiddleware");

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/goals", goalsRoutes);
app.use("/api/users", usersRoutes);

console.log(path.resolve(__dirname, "../", "frontend", "build", "index.html"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.all("*", (req, res) => {
  res.status(404);
  throw new Error("404 Not Found!");
});

app.use(errorMiddlewareHnadler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serving On Port ${port}`);
});
