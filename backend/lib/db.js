import mongoose from 'mongoose';

export const connectToDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully: ", conn.connection.host); 
    }catch(error){
        console.error("Error connecting to MOngoDB", error.message);
        process.exit(1); //1 is fail 0 is success
    }
}