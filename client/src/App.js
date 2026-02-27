import React, { useEffect, useState } from 'react';

function App() {
  const [serverMessage, setServerMessage] = useState("Connecting...");

  useEffect(() => {
    fetch("http://localhost:5000/api/status")
      .then(res => res.json())
      .then(data => setServerMessage(data.message))
      .catch(err => setServerMessage("Server not found"));
  }, []);

  return (
    <div>
      <h1>My Full Stack App</h1>
      <p>Server Status: {serverMessage}</p>
    </div>
  );
}

export default App;
