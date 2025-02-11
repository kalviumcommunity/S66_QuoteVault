const express = require('express')
const bodyParser=require('body-parser')
const app = express()

const mongoose =require('mongoose')
const port = 4000


mongoose.connect('mongodb://localhost:27017/quote_vault',{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>console.log("MONGODB connected"))
.catch(err=>console.log(err))

const userschema = new mongoose.Schema({
    name:{
        type:String},
    email:{
        type:String,
        required:true},
    password:{
        type:String,
        required:true
    }
    
})
const user=mongoose.model('user',userschema);

app.use(bodyParser.json());





app.get('/ping',(req,res)=>{
    try{
        res.status(200).send("pong")
    }
    catch{
        console.log("Error")
    }

    

})

app.post('/signup',async(req,res)=>{
        const {name,email,password}=req.body;
        try{
            const newuser = new user({name,email,password});
            await newuser.save();
            res.status(200).send("user registered successfully")

        }catch(error){
            res.status(400).send(err.message);
        }
})


app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user = await user.findOne({email});
        if(user && user.password === password){
            res.status(200).send("user  logged in successfully")
        }else{
            res.status(401).send("invalid username or password");
        }

    }catch(Err){
        res.status(400).send(Err.message)
    }
    
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
