import mongoose from "mongoose";

export const connectDB = async () => {
    try  {
        const mongoUrl = process.env.MONGODB_CONNECT_URL;

        if (!mongoUrl) {
            throw new Error("MONGODB_CONNECT_URL is not defined in environment variables")
        }

        await mongoose.connect(mongoUrl);

        console.log("MongoDB connected");
    } catch (err) {
        if (err instanceof Error) {
            console.error("MongoDB connection error:", err.message);
        } else {
            console.error("An unknown error occured during DB connection");
        }

        process.exit(1);
    }
};