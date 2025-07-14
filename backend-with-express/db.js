import mysql from "mysql2/promise";
import dotenv from "dotenv";
import expressMySQLSession from "express-mysql-session";
import session from "express-session";

dotenv.config();

const MySQLStore = expressMySQLSession(session);

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const sessionStore = new MySQLStore({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

export { db, sessionStore };
