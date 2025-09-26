const mongoose = require('mongoose');

const recipeShema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    ingredients:{
        type:String,
        required:true
    },
    instructions:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('Recipe', recipeShema);
