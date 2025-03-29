 import mongoose from "mongoose";


 const connectDB = async () => {

    mongoose.connection.on('connected', ()=> console.log("Datebase Connected"))

    await mongoose.connect(`${process.env.MONGODB_URL}/salz`)

}

export default connectDB 