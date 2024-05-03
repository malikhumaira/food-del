
import mongoose from "mongoose";

export const connectDB = async ()=> {
    try {
        await mongoose.connect('mongodb+srv://malikhumaira138:WQLIcO7&O2MXUn!V@cluster0.sf7x1h4.mongodb.net/food-del')
        .then(() =>console.log("DB connected"));
    } catch(error) {
        console.error("Error connecting to MongoDB:", err.message);
    }
}

// import mongoose from "mongoose";

// export const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb+srv://malikhumaira138:5HPsYVs2yNK0ztnQ@cluster0.6q60cvl.mongodb.net/food-panda', 
//     );
//     console.log("DB connected");
//   } catch (err) {
//     console.error("Error connecting to MongoDB:", err.message);
//     process.exit(1); // Exit the process with a non-zero status code to indicate an error
//   }
// };
