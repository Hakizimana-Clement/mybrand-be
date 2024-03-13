const express = require("express");
const app = express();
// routes
const apiRoutes = require("./src/routes");

app.use(express.json());

// // middleware
// // show path and method coming in server
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/", apiRoutes);
app.use("/api/", (req, res) =>
  res.status(200).json({ message: "Welcome to Blog API" })
);

module.exports = app;
