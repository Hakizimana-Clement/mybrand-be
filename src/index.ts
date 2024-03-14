import "dotenv/config";
const port = process.env.PORT;
import { app } from "./app";
import { mongoConnect, mongoDisconnect } from "./services/mongo";

const startServer = async () => {
  // connect to database first
  try {
    await mongoConnect();
    // server connection
    app.listen(port, () => {
      console.log(`Server has started on port ${port}`);
    });
  } catch (error) {
    await mongoDisconnect();
  }
};

startServer();
