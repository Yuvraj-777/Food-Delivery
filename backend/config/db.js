import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://for04bluestacks:Unknown321@cluster0.9cewo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("DataBase Connected"));
}