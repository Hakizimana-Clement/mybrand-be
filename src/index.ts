import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;

import cors from "cors";
// const portString = process.env.PORT;
// const port = portString ? parseInt(portString ) : undefined;
import { app } from "./app";
import { mongoConnect, mongoDisconnect } from "./services/mongo";

// swagger
import swaggerDocs from "./utils/swagger";
const startServer = async () => {
  // connect to database first
  try {
    await mongoConnect();
    // server connection
    app.listen(port, () => {
      app.use(cors());
      console.log(`Server has started on port ${port}`);
      swaggerDocs(app, port);
    });
  } catch (error) {
    await mongoDisconnect();
  }
};

startServer();
