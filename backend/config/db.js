
import mongoose from "mongoose";

export const connectDB = async ()=> {
    try {
        await mongoose.connect('mongodb+srv://malikhumaira138:WQLIcO7&O2MXUn!V@cluster0.sf7x1h4.mongodb.net/food-del')
        .then(() =>console.log("DB connected"));
    } catch(error) {
        console.error("Error connecting to MongoDB:", err.message);
    }
}
