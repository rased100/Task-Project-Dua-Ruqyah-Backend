const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

// database connection
const database = new sqlite3.Database("./dua_main.sqlite");

// Middleware
app.use(express.json());
app.use(cors());

// get
app.get("/", (req, res) => {
  res.send("duaruqyah node server running");
});

// server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
