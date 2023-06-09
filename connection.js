import dotenv from "dotenv";
import mongoose from "mongoose";

const env = dotenv.config().parsed;

const connection = async () => {
  // connect to mongodb
  mongoose.connect(`${env.MONGODB_URI}${env.MONGODB_HOST}:${env.MONGODB_PORT}`, {
    dbName: env.MONGODB_DB_NAME,
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("tersambung ke MONGO DB");
  });
};
export { connection };
