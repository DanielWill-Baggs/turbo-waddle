require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const portNumber = process.env.PORT;

// Store the Express object in App Constant
const app = express();

// Middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.get("/", (req, res) => {
  res.json({ mssg: "Welcome to the Application" });
});

// Using Mongoose to connect to the DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for Requests set on Port from ENV
    app.listen(portNumber, () => {
      console.log(
        "Port " + portNumber + " is listening! Sucessfully Connected to DB"
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
