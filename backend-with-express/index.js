import express from "express";
import session from "express-session";
import { sessionStore } from "./db.js";
import cors from "cors";
import dotenv from "dotenv";
import customerRoute from "./Routes/customerRoutes.js";
import adminRoute from "./Routes/adminRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5175",
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    name: "bookstore.sid", // connect.sid is the default name of the session if we not add a name like -->name: 'bookstore.sid',
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use("/book-haven/api", customerRoute);
app.use("/book-haven/api", adminRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
