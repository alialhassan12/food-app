const express = require('express');
require('dotenv').config();
const connectDB=require('./config/databaseConnection.js');
const cors=require('cors');
const app=express();

const Port=process.env.Port || 3000;

//middlewares
app.use(express.json());
app.use(cors());

app.use('/recipe', require('./routes/recipeRoute.js'));

const startServer= async()=>{
    try{
        await connectDB.connect();
        app.listen(Port,()=>{
            console.log(`server is running on port ${Port}`);
        });
    } catch(err){
        console.log("Server faild to start", err);
    }
}

startServer();