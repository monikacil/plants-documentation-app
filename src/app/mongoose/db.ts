import mongoose from "mongoose";

const URI = process.env.MONGODB_URI as string;

if (!URI) {
  throw new Error("MongoDB URI not found");
}

const connectDb = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(URI);
    console.log("Connected with MongoDB");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default connectDb;
