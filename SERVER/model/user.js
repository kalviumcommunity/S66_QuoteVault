const mongoose=require('mongoose')

const userschema=new mongoose.Schema({
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
module.exports=user;
