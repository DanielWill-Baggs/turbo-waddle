const express = require("express");

// Store the Express object in App Constant
const app = express();

// Listen for Requests set on Port 4000
app.listen(4000, () => {
  console.log("Port 4000 is listening!");
});
