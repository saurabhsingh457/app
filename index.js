// const mongoose=require("mongoose")
// mongoose.set('strictQuery', false)
const express=require("express")
const app=express()
const connection=require("./configs/db")
const cors=require("cors")
require("dotenv").config()

app.use(cors({
    origin:"*"
}))
// const {Usermodel}=require("./model/user.model")
app.use(express.json())
// const bcrypt = require('bcrypt');

// var jwt = require('jsonwebtoken');





app.get("/",async(req,res)=>{
    // var token =await jwt.sign({ foo: 'bar' }, 'key',{expiresIn:20});
    // jwt.verify
    res.json("welcome")
   
    console.log("hello")
})

const {userroute}=require("./routes/user.route")

const { authentication } = require("./middleware/authentication .middleware")


const { noteRoute } =require("./routes/note.route")
app.use("/users",userroute)

app.use(authentication)
app.use("/notes",noteRoute)




// app.get("/about",(req,res)=>{
//     const token=req.headers.authorization
//     jwt.verify(token,"key",(err,decode)=>{
//      if(err){
//         console.log(err)
//         res.send("token expired")
//      }else{
//         res.send("about api")
//      }
//     })
    
   
// })

// app.get("/data",(req,res)=>{
//     const token=req.query.token
//     if(token=="abc123"){
//         res.send("data")
//     }else{
//         res.send("login first")
//     }
  
// })

// app.get("/contact",(req,res)=>{
//     res.send("contact page")
// })


// app.get("/cart",(req,res)=>{
//     const token=req.query.token
//     if(token=="abc123"){
//         res.send("cart page")
//     }else{
//         res.send("login first")
//     }
//     // res.send("cart page")
// })




app.listen(process.env.port,async()=>{

    try {
        await connection
    } catch (error) {
        console.log("error")
    }
    console.log("server 3500")
})