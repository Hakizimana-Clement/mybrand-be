import { Request, Response } from "express";
import Query from "../models/queryModels";

///////////////////////////////////
// Get all querries
//////////////////////////////////
const httpGetAllQuerries = async (req: Request, res: Response) => {
  // step 1. we use find method and store in varibale
  const querries = await Query.find({}).sort({ createdAt: -1 });

  // step 2. send data
  res
    .status(200)
    .json({ status: "200", message: "success", querries: querries });
};

//////////////////////////////////
// Create query
//////////////////////////////////
const httpCreateQuery = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  try {
    const query = new Query({
      name,
      email,
      message,
    });

    await query.save();
    res.status(201).json({
      status: "201",
      message: "Created querry successfully",
      query: query,
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ status: "400", message: "Bad request", error: error.message });
  }
};

//////////////////////////////////
// Delete blog
//////////////////////////////////
const httpDeleteQuery = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const blog = await Query.findOneAndDelete({ _id: id });

    if (!blog)
      return res.status(404).json({
        status: "404",
        message: "Not found",
        error: "Query Not Found",
      });

    res
      .status(200)
      .json({ status: "200", message: "delete query successfully" });
  } catch (error) {
    res.status(404).json({
      status: "404",
      message: "Not found",
      error: "Query Not Found",
    });
  }
};
export { httpGetAllQuerries, httpCreateQuery, httpDeleteQuery };
