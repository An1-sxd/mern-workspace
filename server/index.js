import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // This lets your React app connect!
app.use(express.json());

// YOUR CONNECTION STRING (Update with your password and DB name!)

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function connectDB() {
    try {
        // 1. Establish the connection
        await client.connect();

        // 2. THE PING (Optional but recommended safety check)
        await client.db("admin").command({ ping: 1 });
        console.log("Server successfully pinged MongoDB Atlas!");

        // 3. YOUR TEST CODE
        const database = client.db('MyLabDB'); // Replace with your actual DB name
        const testCollection = database.collection('connection_tests');

        const result = await testCollection.insertOne({
            message: "If you see this, the bridge is working!", 
            timestamp: new Date() 
        });

        console.log(`Success! Test document inserted with ID: ${result.insertedId}`);

    } catch (e) {
        console.error("Connection error:", e);
    }
}

connectDB();

// A simple "Route" for your React app to call
app.get("/api/status", (req, res) => {
  res.json({ message: "Hello from the Server!" });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
