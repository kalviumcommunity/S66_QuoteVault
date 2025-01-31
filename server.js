const express = require('express')
const app = express()

const port = 3000

app.get('/ping',(req,res)=>{
    try{
        res.status(200).send("pong")
    }
    catch{
        console.log("Error")
    }

    

})


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
