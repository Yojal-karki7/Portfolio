import mongoose from "mongoose";

const dbConnection = async()=>{
    mongoose.connection.on('connected', ()=>{
        console.log('Mongodb connected');
    })
    await mongoose.connect(`${process.env.MONGODB_URL}/portfolio`)
}

export default dbConnection