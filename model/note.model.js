const mongoose=require("mongoose")
// mongoose.set('strictQuery', false)


const noteSchema=mongoose.Schema({
    title:String,
    notes:String,
    category:String,
    userId:String
})

const Notemodel=mongoose.model("notes",noteSchema)

module.exports={Notemodel}
