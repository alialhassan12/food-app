const express = require('express');
require('dotenv').config();
const app=express();

const Port=process.env.Port || 3000;

app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`);
});