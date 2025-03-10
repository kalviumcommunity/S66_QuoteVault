const express =require('express')
const mongoose=require('mongoose')
const router=express.Router();
const User = require('../model/user');




router.post('/users',async(req,res)=>{
    try{
    const newUser=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })

    await newUser.save();

    res.status(201).json({
        message:"user created successfully",
        user:{
            id:newUser._id,
            name:newUser.name,
            email:newUser.email
        }
    });
}catch(err){
    res.status(500).json({
        message:"error creating user",
        error:err.message
        });
}
})


router.get('/users',async(req,res)=>{
    try{
        const users=await User.find();
        res.status(200).json(users)
    }catch(err){
        res.status(500).json({"users not found":err})
    }
})

router.get('/users/:id',async(req,res)=>{
    try{
        const id=req.params.id
        const user=await User.findById(id)
        if(!user){
            res.status(404).json({"user not found":id})
        }
        else{
            res.status(200).json(user)
        } 
    }
    catch(err){
        res.status(500).json({"error found":err})
    }
})

router.put('/users/:id',async(req,res)=>{
    try{
        const id=req.params.id
        const user=await User.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json({"error found":error})
    }
})


router.delete('/users/:id',async(req,res)=>{
    try{
    const id=req.params.id
    const deleteduser=await User.findByIdAndDelete(id)  
    res.status(200).json({message:"deleted successfully"})
    }
    catch(err){
        res.status(500).json({err:"error deleting user"})
    }
})

module.exports=router;