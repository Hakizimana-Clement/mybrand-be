import mongoose from "mongoose";
const databaseUrl = process.env.MONGO_URL as string;

// connection on (open) event
mongoose.connection.on("open", () => {
  console.info("Database connected successfully");
});
// connection off (close) event
mongoose.connection.on("close", () => {
  console.info("Something went wrong on Database");
});

// connect to mongo url
const mongoConnect = async () => {
  await mongoose.connect(databaseUrl);
};
// disconnect mongo
const mongoDisconnect = async () => {
  await mongoose.disconnect();
};

export { mongoConnect, mongoDisconnect };

// module.exports = { mongoConnect, mongoDisconnect };
