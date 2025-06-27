import mongoose from "mongoose";

const URI = process.env.DATABASE_URL as string;

if (!URI) {
    throw new Error("MongoDB URI not found");
}

export async function connectDb() {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(URI);
        console.log("Connected with MongoDB");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

