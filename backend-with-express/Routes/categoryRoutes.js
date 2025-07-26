import express from "express";
import { db } from "../db.js";

categoryRoute = express.Router();

//----------------------insert category name-------------------------

categoryRoute.post("/category/insert-category", async (req, res) => {
  const { category_name } = req.body;
  const sql = `insert into categories (category_name ) values (?)`;

  try {
    if (!category_name || !category_name.trim()) {
      return res.status(400).json({ message: "Category name required" });
    }
    const [result] = await db.execute(sql, [category_name]);
    res.status(201).json({
      message: "Category name inserted successfuly",
      inserdedID: result.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "This category already exists" });
    }
    res.status(500).json({ message: "Database error", details: error.message });
  }
});

//----------------------------get all category names-----------------------
categoryRoute.get("/category/get/all-categories", async (req, res) => {
  const sql = `select * from categories `;

  try {
    const [result] = await db.execute(sql);
    if (result.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Get categories error", error);
    res.status(500).json({ message: "Database error", details: error.message });
  }
});

//-----------------------------get individual category name-----------------

categoryRoute.get("/category/get/individual-category/:id", async (req, res) => {
  const category_id = req.params.id;
  const sql = `select * from categories where category_id=? `;

  try {
    const [result] = await db.execute(sql, [category_id]);
    if (!result[0]) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Get individual category  error:", error);
    res.status(500).json({ message: "Database error", details: error.message });
  }
});

//--------------------------update category name------------------------

categoryRoute.put("/category/update/category-name/:id", async (req, res) => {
  const category_id = req.params.id;
  const { category_name } = req.body;
  const sql = `update categories set category_name=? where category_id=? `;

  try {
    if (!category_name || !category_name.trim()) {
      return res
        .status(400)
        .json({ message: "Insert category name to update" });
    }
    const [result] = await db.execute(sql, [category_name, category_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No category found" });
    }
    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    console.error("Update category error: ", error);
    res.status(500).json({ message: "Database error", details: error.message });
  }
});

//--------------------------delete category name--------------------------

categoryRoute.delete("/category/delete/category-name/:id", async (req, res) => {
  const category_id = req.params.id;
  const sql = `delete from categories where  category_id=?`;

  try {
    const [result] = await db.execute(sql, [category_id]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: `No category found with ID :${category_id}` });
    }
    res.status(200).json({ message: "Category deleted successfuly" });
  } catch (error) {
    console.error("Delete category error:", error);
    res.status(500).json({ message: "Database error", details: error.message });
  }
});

export default categoryRoute;
