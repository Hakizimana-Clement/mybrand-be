import mongoose from "mongoose";
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
  await mongoose.connect(
    "mongodb://127.0.0.1:27017/BlogDataBase?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1"
  );
};
// disconnect mongo
const mongoDisconnect = async () => {
  await mongoose.disconnect();
};

export { mongoConnect, mongoDisconnect };

// module.exports = { mongoConnect, mongoDisconnect };
