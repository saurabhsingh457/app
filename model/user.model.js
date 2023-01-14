
const mongoose=require("mongoose")
// mongoose.set('strictQuery', false)
// const {connection}=require("./")

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    pass:String
})

const Usermodel=mongoose.model("user",userSchema)

module.exports={Usermodel}