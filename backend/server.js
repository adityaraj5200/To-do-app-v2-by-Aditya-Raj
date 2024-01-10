const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);

// Connection to mongoDB through mongoose
const connectionString = 'mongodb://localhost:27017';
const collectionName = 'todo-app-v2-by-aditya';
mongoose.connect(connectionString + '/' + collectionName)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const PORT = 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));