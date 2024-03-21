import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
// const databaseUrl = process.env.MONGO_URL as string;
const databaseUrl = process.env.MONGO_URL_TEST as string;

// connection on (open) event
mongoose.connection.on("open", () => {
  console.info("Testing Database connected successfully");
});
// connection off (close) event
mongoose.connection.on("close", () => {
  console.info("Something went wrong on Testing Database");
});

// connect to mongo url
const mongoConnectToTestingDB = async () => {
  await mongoose.connect(databaseUrl);
};
// disconnect mongo
const mongoDisconnectToTestingDB = async () => {
  await mongoose.disconnect();
};

export { mongoConnectToTestingDB, mongoDisconnectToTestingDB };
