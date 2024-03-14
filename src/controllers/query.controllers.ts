import { Request, Response } from "express";
import Query from "../models/queryModels";

///////////////////////////////////
// Get all querries
//////////////////////////////////
const httpGetAllQuerries = async (req: Request, res: Response) => {
  // step 1. we use find method and store in varibale
  const blogs = await Query.find({}).sort({ createdAt: -1 });

  // step 2. send data
  res.json({ message: "success", data: blogs });
};

//////////////////////////////////
// Create query
//////////////////////////////////
const httpCreateQuery = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  try {
    const query = await Query.create({ name, email, message });
    res.status(201).json(query);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};

//////////////////////////////////
// Delete blog
//////////////////////////////////
const httpDeleteQuery = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const blog = await Query.findOneAndDelete({ _id: id });

    if (!blog) return res.status(404).json({ error: "Query doesn't exist" });

    res.status(201).json();
  } catch (error) {
    res.status(404).json({ error: "Query doesn't exist" });
  }
};
export { httpGetAllQuerries, httpCreateQuery, httpDeleteQuery };
