import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.json({ message: "hello world" });
});

app.listen(3000, () => {
  console.log("server run in http://localhost:3000");
});
