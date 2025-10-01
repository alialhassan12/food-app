const express = require('express');
const multer=require('multer');
const path = require('path');
const router=express.Router();
const recipes=require('../models/recipeSchema.js');

//add upload the middleware to save the images in /uploads/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload=multer({storage:storage});

router.get('/', async(req,res)=>{
    try{
        const allRecipes=await recipes.find();
        res.status(200).json({message:"all recipes",allRecipes});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Server error"});
    }
});

router.post('/add', upload.single('image'),async (req,res)=>{
    //get the image file from req.file
    const imagePath=req.file?req.file.path :null;
    
    const {title,ingredients,instructions}=req.body;
    try{
        if(!title || !ingredients || !instructions){
            return res.status(422).json({error:"Please fill all the fields"});
        }
        const newRecipe= await recipes.create({
            title,
            ingredients,
            instructions,
            image:imagePath
        });
        res.status(201).json({message:"Recipe added successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Server error"});
    }
});

router.get('/:id', async(req,res)=>{
    const {id}=req.params;
    try{
        const recipe=await recipes.findById(id);
        if(!recipe){
            return res.status(404).json({error:'Recipe not found'});
        }
        res.status(200).json(recipe);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Server error"});
    }
});

router.put('/:id',async(req,res)=>{
    const {id}=req.params;
    const {title,ingredients,instructions}=req.body;
    try{
        const updateRecipe=await recipes.findByIdAndUpdate(
            id,
            {title,ingredients,instructions},
            {runValidators:true,new:true}
        );
        if(!updateRecipe){
            return res.status(404).json({error:"Resipe not Found"});
        }
        res.status(200).json({message:"Recipe updated Successfully",updateRecipe});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Server error"});
    }
});

router.delete('/:id',async(req,res)=>{
    const {id}=req.params;
    try{
        const deletedRecipe=await recipes.findByIdAndDelete(id);
        if(!deletedRecipe){
            return res.status(404).json({error:"Resipe not Found"});
        }
        res.status(200).json({message:"Recipe deleted Successfully",deletedRecipe});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Server error"});
    }
})
module.exports=router;