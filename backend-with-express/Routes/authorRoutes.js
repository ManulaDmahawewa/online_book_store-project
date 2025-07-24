import express from "express";
import { db } from "../db.js";

const authorRoute = express.Router();

//------------------------route for insert new author------------------------------

authorRoute.post("/author/insert-author", async (req, res) => {
  const { author_name, author_bio, author_country } = req.body;
  const sql = `insert into author_details ( author_name,author_bio,author_country) values(?,?,?)`;

  try {
    if (!author_name.trim() || !author_bio.trim() || !author_country.trim()) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const [result] = await db.execute(sql, [
      author_name,
      author_bio,
      author_country,
    ]);
    res.status(200).json({ message: "Author details inserted successfuly" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "This author already exists" });
    }
    res.status(500).json({ message: "Database error", details: error.message });
  }
});

//------------------route for get all author details------------------------------

authorRoute.get("/author/get/all-author-details", async (req, res) => {
  const sql = `select * from author_details`;
  try {
    const [result] = await db.execute(sql);
    if (result.length === 0) {
      return res.status(404).json({ message: "No author details found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Get author-details error", error);
    res.status(500).json({ message: "Database error", details: error.message });
  }
});

//---------------------------route for get individual author details----------------
authorRoute.get(
  "/author/get/individual-author-details/:id",
  async (req, res) => {
    const author_id = req.params.id;
    const sql = "select * from author_details where author_id=?";

    try {
      const [result] = await db.execute(sql, [author_id]);
      if (!result[0]) {
        return res.status(404).json({ message: "Author not found" });
      }
      res.status(200).json(result[0]);
    } catch (error) {
      console.error("Get individual author details error: ", error);
      res
        .status(500)
        .json({ message: "Database error", details: error.message });
    }
  }
);

//--------------------------route for update author details-----------------------

authorRoute.put("/author/update/author-details/:id", async (req, res) => {
  const author_id = req.params.id;
  const { author_name, author_bio, author_country } = req.body;
  const sql = `update author_details set author_name=?,author_bio=?,author_country=? where author_id=? `;

  if (!author_name || !author_bio || !author_country) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [result] = await db.execute(sql, [
      author_name,
      author_bio,
      author_country,
      author_id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json({ message: "Author updated successfuly" });
  } catch (error) {
    console.error("Update author error: ", error);
    res.status(500).json({ message: "Database error", details: error.message });
  }
});

//-----------------------route for delete author details-----------------------

authorRoute.delete("/author/delete/author-details/:id", async (req, res) => {
  const author_id = req.params.id;
  const sql = `delete from author_details where author_id=?`;

  try {
    const [result] = await db.execute(sql, [author_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json({ message: "Author deleted successfuly" });
  } catch (error) {
    console.error("Delete author error: ", error);
    res.status(500).json({ message: "Database error", details: error.message });
  }
});

export default authorRoute;
