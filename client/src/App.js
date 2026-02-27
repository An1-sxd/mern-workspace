import React, { useEffect, useState } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  // 1. Memory for the form inputs
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: ''
  });

  // Fetch students function (we'll call this after adding a new one too)
  const fetchStudents = () => {
    fetch("http://localhost:5000/api/students")
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error("Error:", err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 2. Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. The POST Request (The "Thunder Client" logic inside React)
  const handleSubmit = (e) => {
    e.preventDefault(); // Stop the page from refreshing

    fetch("http://localhost:5000/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData) // Turn the JS object into a JSON string
    })
    .then(res => res.json())
    .then(() => {
      fetchStudents(); // Refresh the list so the new student appears!
      setFormData({ firstName: '', lastName: '', email: '', age: '' }); // Clear form
    })
    .catch(err => alert("Error saving student"));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Student Management</h1>

      {/* THE FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc' }}>
        <h3>Add New Student</h3>
        <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required /><br/>
        <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required /><br/>
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br/>
        <input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} /><br/>
        <button type="submit">Add Student</button>
      </form>

      <hr />

      {/* THE LIST */}
      <h2>Student List</h2>
      <ul>
        {students.map(s => (
          <li key={s._id}>{s.firstName} {s.lastName} - {s.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
