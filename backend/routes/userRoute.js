const express=require('express');
const User=require('../models/UserShema');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const router=express.Router();


router.post('/register',async(req,res)=>{
    try{
        const {email,password}=req.body;
        //check if email and password not empty
        if(!email ||!password){
            return res.status(400).json({error:"Email and password are required"});
        }
        let user=await User.findOne({email});
        //check if user exist
        if(user){
            return res.status(400).json({error:"User already exists"});
        }

        //hash the password using bcryptjs
        const hashedPass=await bcrypt.hash(password,10);

        //creating new user
        const newUser=User.create({email,password:hashedPass});
        (await newUser).save
        //create the token using jsonwebtoken
        let token=jwt.sign({email,id:newUser._id},process.env.SECRET_KEY,{expiresIn:"1w"});

        //after completing register and web token 
        return res.status(200).json({message:"user Registered Successfully",token,newUser});    

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Server error"});
    }
});

router.post('/signin',async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({error:"Email and password are required"});
        }
        const user=await User.findOne({email});
        if(user && await bcrypt.compare(password,user.password)){
            //create the token using jsonwebtoken after successfull signin
            let token=jwt.sign({email,id:user._id},process.env.SECRET_KEY,{expiresIn:"1w"});
            return res.status(200).json({message:"user Signed in Successfully",token,user});
        }else{
            return res.status(400).json({error:"Invalid user credentials"});
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({error:"Server Error"});
    }
});

router.get('/:id',async(req,res)=>{
    try{
        const user= await User.findById(req.params.id);
        if(!user){
            return res.status(400).json({error:"User Not Found"});
        }
        return res.status(200).json({user});
    }catch(err){
        console.log(err);
        return res.status(500).json({error:"Server Error"});
    }
});

module.exports=router