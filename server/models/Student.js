import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  firstName: { type: String, required: true }, // Cannot be empty!
  lastName: { type: String, required: true },
  age: { type: Number },
  email: { type: String, unique: true, required: true },
});

const Student = mongoose.model("Student", StudentSchema);
export default Student;
