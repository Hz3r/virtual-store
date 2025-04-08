
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log('conectador correctamente');
    } catch (error) {
        console.log('no se conecto correctamente');
        process.exit(1)
    }

}
export default connectDB;