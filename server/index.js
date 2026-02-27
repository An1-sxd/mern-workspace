import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import {
  addStudent,
  deleteStudent,
  getStudent,
  getStudents,
  updateStudent,
} from "./controllers/student.controller.js";

dotenv.config(); // must be at the very top

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mongoose connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.get("/api/status", (req, res) => {
  res.json({ message: "Hello from the Server!" });
});
app.get("/api/students", getStudents);
app.get("/api/students/:id", getStudent);
app.post("/api/students", addStudent);
app.delete("/api/students/:id", deleteStudent);
app.put("/api/students/:id", updateStudent);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);