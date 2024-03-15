import express from "express";
const apiRoutes = express.Router();
// import routes
import blogRouter from "./blogs.routes";
import querriesRouter from "./querries.routes";
import authRouter from "./user.routes";
//  Endpoints
apiRoutes.use("/blogs", blogRouter);
apiRoutes.use("/querries", querriesRouter);
apiRoutes.use("/user", authRouter);

export default apiRoutes;
