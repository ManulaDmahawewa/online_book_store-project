import express from "express";
import { db } from "../db.js";

const bookRoute = express.Router();

//-----------------------insert book details-----------------
bookRoute.post("/book/insert-book-details", async (req, res) => {
  const {
    book_name,
    book_description,
    book_image,
    book_price,
    book_qty,
    author_id,
    category_id,
  } = req.body;
  const sql = `insert into books 
  (
  book_name,
  book_description,
  book_image,
  book_price,
  book_qty,
  author_id,
  category_id
  ) 
  values (?,?,?,?,?,?,?) `;

  try {
    if (
      !book_name ||
      !book_description ||
      !book_image ||
      book_price === undefined ||
      book_qty === undefined ||
      !author_id ||
      !category_id
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const price = Number(book_price);
    const qty = parseInt(book_qty);
    const authorID = parseInt(author_id);
    const categoryID = parseInt(category_id);

    const [result] = await db.execute(sql, [
      book_name,
      book_description,
      book_image,
      price,
      qty,
      authorID,
      categoryID,
    ]);
    res.status(201).json({ message: "Book details inserted successfuly" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "This book already exists" });
    }
    res.status(500).json({ message: "Database error", details: error.message });
  }
});

//---------------------------------get all book detals------------------------------
bookRoute.get("/book/get/all-books", async (req, res) => {
  const sql = `select 
    b.book_id,
    b.book_name,
    b.book_description,
    b.book_image,
    b.book_price,
    b.book_qty,
    b.author_id,
    b.category_id,
    a.author_name,
    c.category_name
    from books b
    inner join author_details a on b.author_id=a.author_id
    inner join categories c on b.category_id=c.category_id
    order by b.book_id  `;

  try {
    const [result] = await db.execute(sql);
    if (result.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("get all books error:", error);
    res.status(500).json({ message: "Database error", details: error.message });
  }
});

//-------------------------get individual book details-----------------------------
bookRoute.get("/book/get/individual-book/:id", async (req, res) => {
  const book_id = req.params.id;
  const sql = `select 
    b.book_id,
    b.book_name,
    b.book_description,
    b.book_image,
    b.book_price,
    b.book_qty,
    b.author_id,
    b.category_id,
    a.author_name,
    c.category_name
    from books b
    inner join author_details a on b.author_id=a.author_id
    inner join categories c on b.category_id=c.category_id
    where  b.book_id=? `;

  try {
    const [result] = await db.execute(sql, [book_id]);
    if (!result[0]) {
      return res
        .status(404)
        .json({ message: `No any book found with bookID : ${book_id}` });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    console.error("get individual book details error:", error);
    res.status(500).json({ message: "Database error", details: error.message });
  }
});

//--------------------------update book details-------------------------
bookRoute.put("/book/update/book-details/:id", async (req, res) => {
  const book_id = req.params.id;

  const {
    book_name,
    book_description,
    book_image,
    book_price,
    book_qty,
    author_id,
    category_id,
  } = req.body;

  const sql = `update books set 
    book_name=?,
    book_description=?,
    book_image=?,
    book_price=?,
    book_qty=?,
    author_id=?,
    category_id=?
    where book_id=? `;

  try {
    if (
      !book_name ||
      !book_description ||
      !book_image ||
      book_price === undefined ||
      book_qty === undefined ||
      !author_id ||
      !category_id
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const price = Number(book_price);
    const qty = parseInt(book_qty);
    const authorID = parseInt(author_id);
    const categoryID = parseInt(category_id);

    const [result] = await db.execute(sql, [
      book_name,
      book_description,
      book_image,
      price,
      qty,
      authorID,
      categoryID,
      book_id,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: `No book found  with bookID: ${book_id}` });
    }
    res.status(200).json({ message: "Book details updated successfuly" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "This book already exists" });
    }
    console.error("Update book error:", error);
    res.status(500).json({ message: "Database error", details: error.message });
  }
});

//---------------------------delete book details-------------------------

bookRoute.delete("/book/delete/book-details/:id", async (req, res) => {
  const book_id = req.params.id;
  const sql = `delete from books where book_id=?`;

  try {
    const [result] = await db.execute(sql, [book_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json(`No book found  with bookID: ${book_id}`);
    }
    res.status(200).json({ message: "Book details deleted successfuly" });
  } catch (error) {
    console.error("Delete book error", error);
    res.status(500).json({ message: "Database error", details: error.message });
  }
});

export default bookRoute;
