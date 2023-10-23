import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) return console.log("MongoDb is not defined");

  if (isConnected) return console.log("Using existing database connection");

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "market_goods",
    });

    isConnected = true;
    console.log("MongoDb is Connected");
  } catch (error: any) {
    console.log(error);
  }
};
