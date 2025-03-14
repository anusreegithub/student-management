import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const dbUri = process.env.MONGODB_URI;
        if (!dbUri) {
            throw new Error("❌ MONGODB_URI is not defined in environment variables.");
        }

        await mongoose.connect(dbUri);
        console.log("✅ Database connected successfully");

        mongoose.connection.on("error", (err) => {
            console.error("❌ Database connection error: ", err);
        });

    } catch (err) {
        console.error("❌ Database connection failed: ", err);
        process.exit(1); 
    }
};

export default connectDB;
