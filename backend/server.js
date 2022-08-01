const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/connetDB");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

const app = express();
dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((n) => n._id === req.params.id);
  res.send(note);
});

app.use("/api/users", userRoutes);
app.use("/api/note", noteRoutes);

// <-------------------------------- deployment ------------------------------>

const _dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("api running");
  });
}

// <-------------------------------- deployment ------------------------------>

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`server start at ${PORT}`));
