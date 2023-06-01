// server.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const database = require("./config/database");
const seedUsers = require("./seeders/userSeeder");

const app = express();
const port = process.env.SERVER_PORT;

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Seed initial users
// seedUsers();
