import express from "express";
const apiRoutes = express.Router();
// import routes
import blogRouter from "./blogs.routes";
import querriesRouter from "./querries.routes";
import authRouter from "./user.routes";
// swagger
import swaggerUi from "swagger-ui-express";
import specs from "../swaggerConfig";
import swaggerDocs from "../utils/swagger";
// apiRoutes.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// apiRoutes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
//  Endpoints
apiRoutes.use("/users", authRouter);
apiRoutes.use("/blogs", blogRouter);
apiRoutes.use("/queries", querriesRouter);

export default apiRoutes;
