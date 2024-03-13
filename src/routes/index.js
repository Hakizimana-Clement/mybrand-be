const express = require("express");
const blogRoutes = require("./blogs.routes");

const apiRoutes = express.Router();

// blog endpoint
apiRoutes.use("/blogs", blogRoutes);

module.exports = apiRoutes;
