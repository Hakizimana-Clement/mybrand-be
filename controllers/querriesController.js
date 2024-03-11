const Query = require("../models/querriesModel");

// get all querries
const getAllQuerries = async (req, res) => {
  const querries = await Query.find({});
  res.status(200).json(querries);
};
// get a single querries
const getSingleQuery = async (req, res) => {
  const { id } = req.params;

  try {
    const querry = await Query.findById(id);
    if (!querry) {
      return res.status(404).json({ error: "Querries not found" });
    }
    res.status(200).json(querry);
  } catch (error) {
    res.status(404).json({ error: "Querries not found" });
  }
};

// create query
const createQuery = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const query = await Query.create({ name, email, message });
    res.status(201).json(query);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a single query
const deleteQuery = async (req, res) => {
  const { id } = req.params;

  try {
    const query = await Query.findOneAndDelete(id);

    if (!query) {
      return res.status(404).json({ error: "Querries not found" });
    }
    res.status(204).json(query);
  } catch (error) {
    return res.status(404).json({ error: "Querries not found" });
  }
};
// update a single query

module.exports = { getAllQuerries, getSingleQuery, createQuery, deleteQuery };
