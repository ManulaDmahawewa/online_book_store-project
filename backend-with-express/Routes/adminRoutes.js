import express from "express";
import { db } from "../db.js";
import bcrypt from "bcrypt";

const adminRoute = express.Router();

//-----------------------"/admin/registration--------------------

adminRoute.post("/admin/registration", async (req, res) => {
  const { user_name, user_email, user_password, user_role } = req.body;
  const SqlCheckEmail =
    "select user_email from user_details where user_email=?";
  const sqlInsert =
    "insert into user_details (user_name,user_email,password,user_role) values (?,?,?,?)";

  try {
    const [existing] = await db.execute(SqlCheckEmail, [user_email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "This email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(user_password, 10);
      const [insertUserData] = await db.execute(sqlInsert, [
        user_name.toLowerCase(),
        user_email,
        hashedPassword,
        user_role,
      ]);

      return res.status(201).json({
        message: "Admin registered Successfuly",
        admin: insertUserData,
      });
    }
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "This email already exists" });
    }
    res.status(500).json({ message: "Database error", details: error.message });
  }
});

//-------------------------"/admin/login"----------------------------------

adminRoute.post("/admin/login", async (req, res) => {
  const { user_email, user_password } = req.body;
  const sql =
    "select user_id,user_email,user_role,password from user_details where user_email=? ";

  try {
    const [result] = await db.execute(sql, [user_email]);
    if (result.length === 0) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const admin = result[0];
    const isMatch = await bcrypt.compare(user_password, admin.password);
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

//-----------------------"/admin/session"-------------------------------------

adminRoute.get("/admin/session", async (req, res) => {
  if (req.session.admin) {
    res.status(200).json(req.session.admin);
  } else {
    res.status(400).json({ Message: "No admin session found" });
  }
});

//-------------------"/admin/logout"----------------------------------

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

//---------------------"/admin/get/all-admin-details"---------------------------------

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

//--------------------get user details by user id--------------------

adminRoute.get("/admin/get/admin-details/:id", async (req, res) => {
  const user_id = req.params.id;
  const sql =
    "select user_id,user_name,user_email,user_role from user_details where user_id=? ";
  try {
    const [result] = await db.execute(sql, [user_id]);

    if (result.length === 0) {
      res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database Error", details: error.message });
  }
});

//-----------------------update user details-------------------------------

adminRoute.put("/admin/update/admin-details/:id", async (req, res) => {
  const user_id = req.params.id;
  const { user_name, user_email, user_role } = req.body;
  const sql = `update user_details set user_name=? , user_email=?,user_role=?  where user_id=?`;

  try {
    if (!user_name || !user_email || !user_role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const [result] = await db.execute(sql, [
      user_name,
      user_email,
      user_role,
      user_id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User Updated successfuly" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error", details: error.message });
  }
});

//-------------------detele user--------------------------------

adminRoute.delete("/admin/delete/admin-details/:id", async (req, res) => {
  const user_id = req.params.id;
  const sql = `delete from user_details where user_id=?`;

  try {
    const [result] = await db.execute(sql, [user_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted sucessfuly" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database Error", details: error.message });
  }
});

export default adminRoute;
