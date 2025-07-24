import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ DB connected");
    } catch (error) {
        console.error("❌ DB connection failed:", error.message);
        process.exit(1); // stop the server if DB connection fails
    }
};

export default connectDb;
