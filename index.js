const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes");

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/BlogDataBase?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1"
  )
  .then(() => {
    // middleware
    // handling json
    app.use(express.json());
    // show path and method coming in server
    app.use((req, res, next) => {
      console.log(req.path, req.method);
      next();
    });

    // routes
    app.use("/api", routes);
    // connection
    app.listen(4141, () => {
      console.log("successfully  connected to blog database");
      console.log("server has started  on port 4141");
    });
  })
  .catch((e) => {
    console.log("failed to connect to blog database");
    console.log("failed to start server");
  });
