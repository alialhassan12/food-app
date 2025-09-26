const express = require('express');
const router=express.Router();
const recipes=require('../models/recipeSchema.js');

router.get('/', async(req,res)=>{
    try{
        const allRcipes=await recipes.find();
        res.status(200).json({message:"all recipes",allRcipes});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Server error"});
    }
});

router.post('/add', async (req,res)=>{
    const {title,ingredients,instructions}=req.body;
    try{
        if(!title || !ingredients || !instructions){
            return res.status(422).json({error:"Please fill all the fields"});
        }
        const newRecipe= await recipes.create({
            title,
            ingredients,
            instructions
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