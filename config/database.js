// config/database.js
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://user123:Q36QX0XPaYRs9fpc@cluster0.ltl8p.mongodb.net/Node-Api?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Failed to connect to MongoDB", err);
});

module.exports = mongoose;
