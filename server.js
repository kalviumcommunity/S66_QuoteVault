const express = require('express')
const app = express()

port = 3000

app.get('/ping',(req,res)=>{

    res.status(200).send("pong")

})


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
