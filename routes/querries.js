const express = require("express");
const router = express.Router();
// import querries
const {
  getAllQuerries,
  createQuery,
  getSingleQuery,
  deleteQuery,
} = require("../controllers/querriesController");
router
  // get all querries
  .get("/", getAllQuerries)
  // get a single querries
  .get("/:id", getSingleQuery)
  // create a single query
  .post("/", createQuery)
  // delete a single query
  .delete("/:id", deleteQuery);
// update a single query

module.exports = router;
