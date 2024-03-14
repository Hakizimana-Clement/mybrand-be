import express from "express";
const apiRoutes = express.Router();
// import routes
import blogRouter from "./blogs.routes";
import querriesRouter from "./querries.routes";
import commentRouter from "./comments.routes";
import likesRouter from "./likes.routes";
//  Endpoint
apiRoutes.use("/blogs", blogRouter);
apiRoutes.use("/querries", querriesRouter);
apiRoutes.use("/blogs/", commentRouter);
apiRoutes.use("/blogs/", likesRouter);

// module.exports = apiRoutes;
export default apiRoutes;
