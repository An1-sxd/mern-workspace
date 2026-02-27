import Student from "../models/Student.js";

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addStudent = async (req, res) => {
  const { firstName, lastName, age, email } = req.body;
  try{
    const newStudent = await Student.create({ firstName, lastName, age, email });
    res.status(201).json(newStudent);
  }catch(error){
    res.status(400).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try{
    const deletedStudent = await Student.findByIdAndDelete(id);
    if(!deletedStudent){
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  }catch(error){
    res.status(500).json({ message: error.message });
  }
};

export const getStudent = async (req, res) => {
  const { id } = req.params;
  try{
    const student = await Student.findById(id);
    if(!student){
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  }catch(error){
    res.status(500).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age, email } = req.body;
  try{
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { firstName, lastName, age, email },
      { new: true }
    );
    if(!updatedStudent){
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(updatedStudent);
  }catch(error){
    res.status(400).json({ message: error.message });
  }
};