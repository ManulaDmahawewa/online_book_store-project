import express from "express";
import { db } from "../db.js";
import bcrypt from "bcrypt";

const adminRoute = express.Router();

adminRoute.post("/admin/registration", async (req, res) => {
  const { user_name, user_email, user_password, user_role } = req.body;
  const SqlCheckEmail =
    "select user_email from user_details where user_email=?";
  const sqlInsert =
    "insert into user_details (user_name,user_email,user_password,user_role) values (?,?,?,?)";

  try {
    const [existing] = await db.execute(SqlCheckEmail, [user_email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "This email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(user_password, 10);
      const [insertUserData] = await db.execute(sqlInsert, [
        user_name,
        user_email,
        hashedPassword,
        user_role,
      ]);
      req.session.admin = {
        id: insertUserData.insertId,
        email: user_email,
        role: user_role,
      };
      return res.status(201).json({
        message: "Admin registered Successfuly",
        admin: req.session.admin,
      });
    }
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "This email already exists" });
    }
    res.status(500).json({ message: "Database error", details: error.message });
  }
});

adminRoute.post("/admin/login", async (req, res) => {
  const { user_email, user_password } = req.body;
  const sql =
    "select user_id,user_email,user_role,user_password from user_details where user_email=? ";

  try {
    const [result] = await db.execute(sql, [user_email]);
    if (result.length === 0) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const admin = result[0];
    const isMatch = await bcrypt.compare(user_password, admin.user_password);
    if (isMatch) {
      req.session.admin = {
        id: admin.user_id,
        email: user_email,
        role: admin.user_role,
      };
      res
        .status(200)
        .json({ message: "Login successful", admin: req.session.admin });
    } else {
      res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error", details: error.message });
  }
});

adminRoute.get("/admin/session", async (req, res) => {
  if (req.session.admin) {
    res.status(200).json(req.session.admin);
  } else {
    res.status(400).json({ Message: "No admin session found" });
  }
});

adminRoute.post("/admin/logout", async (req, res) => {
  if (req.session.admin) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destruction error:", err);
        return res.status(500).json({ message: "Logout failed" });
      } else {
        res.clearCookie("bookstore.sid");
        res.status(200).json({ message: "Admin logout successfuly" });
      }
    });
  } else {
    res.status(401).json({ message: "No active session to logout" });
  }
});

adminRoute.get("/admin/get/all-admin-details", async (req, res) => {
  const sql =
    "select user_id,user_name,user_email,user_role from user_details ";

  try {
    const [result] = await db.execute(sql);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "database error", details: error.message });
  }
});

export default adminRoute;
