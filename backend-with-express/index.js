import express from "express";
import session from "express-session";
import { sessionStore } from "./db.js";
import cors from "cors";
import dotenv from "dotenv";
import customerRoute from "./Routes/customerRoutes.js";
import adminRoute from "./Routes/adminRoutes.js";
import authorRoute from "./Routes/authorRoutes.js";
import categoryRoute from "./Routes/categoryRoutes.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

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

//-------------------multer------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, res, cd) => {
    cd(null, path.join(__dirname, "../public/uploads/"));
  },
  filename: (req, file, cd) => {
    cd(null, file.originalname);
  },
});
const upload = multer({ storage });
app.use(express.static("public"));

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req);
  return res.json({
    path: `/uploads/${req.file.filename}`,
  });
});

//----------------------end multer-----------------------

app.use("/book-haven/api", customerRoute);
app.use("/book-haven/api", adminRoute);
app.use("/book-haven/api", authorRoute);
app.use("/book-haven/api", categoryRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
