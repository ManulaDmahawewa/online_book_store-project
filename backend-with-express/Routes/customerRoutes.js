import express from "express";
import { db } from "../db.js";
import bcrypt from "bcrypt";

const customerRoute = express.Router();

customerRoute.post("/customer/registration", async (req, res) => {
  const { customer_name, email, contact_no, delivery_address, password } =
    req.body;
  const sqlCheckEmail = `select email from customer_details where email=? `;
  const sqlInsert = `insert into customer_details (customer_name,email,contact_no,delivery_address,password) values (?,?,?,?,?)`;

  try {
    const [existing] = await db.execute(sqlCheckEmail, [email]);
    if (existing.length > 0) {
      res.status(400).json({ message: "This email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await db.execute(sqlInsert, [
        customer_name,
        email,
        contact_no,
        delivery_address,
        hashedPassword,
      ]);

      console.log(result.insertId);

      req.session.user = {
        customer_id: result.insertId,
        email: email,
      };

      res.status(200).json({
        message: "User registered & logged in successfully",
        user: req.session.user,
      });
    }
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "This email already exists" });
    }
    res.status(500).json({ message: "Database error", error });
  }
});

customerRoute.post("/customer/login", async (req, res) => {
  const { email, password } = req.body;
  const sql = `select customer_id,email,password  from customer_details where email=? `;

  try {
    const [result] = await db.execute(sql, [email]);
    if (result.length === 0) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      req.session.user = {
        customer_id: user.customer_id,
        email: user.email,
      };
      return res
        .status(200)
        .json({ message: "Login successful", user: req.session.user });
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database Error", error });
  }
});

customerRoute.get("/customer/session-details", async (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ message: "No user session found" });
  }
});

customerRoute.post("/customer/logout", async (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destruction error:", err);
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie("bookstore.sid");
      res.status(200).json({ message: "User logged out successfully" });
    });
  } else {
    res.status(401).json({ message: "No active session to logout" });
  }
});

export default customerRoute;
