const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

// database connection
// const database = new sqlite3.Database("./dua_main.sqlite");

// SQLite database connection
const database = new sqlite3.Database("./dua_main.sqlite", (error) => {
  if (error) {
    console.error("Error connecting to database:", error.message);
  } else {
    console.log("Connected to the database.");
  }
});

// Middleware
app.use(express.json());
app.use(cors());

// get
app.get("/", (req, res) => {
  res.send("duaruqyah node server running");
});

// categories
app.get("/api/categories", (req, res) => {
  database.all("SELECT * FROM category", (error, rows) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json(rows);
  });
});

// subcategories
app.get("/api/subcategories", (req, res) => {
  database.all("SELECT * FROM sub_category", (error, rows) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json(rows);
  });
});

// subcategories by category ID
app.get("/api/subcategories/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;
  database.all(
    "SELECT * FROM sub_category WHERE cat_id = ?",
    [categoryId],
    (error, rows) => {
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }
      res.json(rows);
    }
  );
});

// all duas
app.get("/api/dua", (req, res) => {
  database.all("SELECT * FROM dua", (error, rows) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json(rows);
  });
});

// duas by category ID
app.get("/api/dua/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;
  database.all(
    "SELECT * FROM dua WHERE cat_id = ?",
    [categoryId],
    (error, rows) => {
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }

      if (!rows || rows.length === 0) {
        res.status(404).json({ error: "Dua not found" });
        return;
      }

      res.json(rows);
    }
  );
});

// duas by subcategory ID
app.get("/api/dua/subCategory/:subCategoryId", (req, res) => {
  const subCategoryId = req.params.subCategoryId;
  database.all(
    "SELECT * FROM dua WHERE subcat_id = ?",
    [subCategoryId],
    (error, rows) => {
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }

      if (!rows || rows.length === 0) {
        res.status(404).json({ error: "Dua not found" });
        return;
      }

      res.json(rows);
    }
  );
});

// server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
