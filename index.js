const app = require("./app");
const { mongoConnect, mongoDisconnect } = require("./src/services/mongo");

const startServer = async () => {
  // connect to database first
  try {
    await mongoConnect();
    // server connection
    app.listen(4000, () => {
      console.log("Server has started on port 4000");
    });
  } catch (error) {
    await mongoDisconnect();
  }
};

startServer();
