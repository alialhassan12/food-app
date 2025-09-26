const mongoose = require('mongoose');
require('dotenv').config();
const DB_URI=process.env.DB_URI;

const connect =async()=>{
    try{
        await mongoose.connect(DB_URI);
        console.log("Database connected successfully");
    }catch(err){
        console.log("Database connection failed",err);
    }
}

module.exports={connect};