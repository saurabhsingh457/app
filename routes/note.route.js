const express = require("express")
const { Notemodel } = require("../model/note.model")

const noteRoute = express.Router()

noteRoute.get("/get", async (req, res) => {
    const data = req.body
    let noteData = await Notemodel.find()
    console.log(noteData)
    res.json(noteData)

})
noteRoute.post("/post", async (req, res) => {
    const data = req.body
    try {
        let noteData = await Notemodel.insertMany(data)
    console.log(noteData)
    res.json({"msg":"notes successfully posted"})
    } catch (error) {
        console.log({"msg":"error"})
    }

})
noteRoute.patch("/update/:Id", async (req, res) => {

    const { Id } = req.params
    const data = req.body
    const note=await Notemodel.findOne({ _id: Id })
    const userId_in_note=note.userId
    const userId_making_req=req.body.userId
    try {
        if(userId_making_req!==userId_in_note){
            res.json("you are not authorise")
        }else{
            let noteData = await Notemodel.findByIdAndUpdate({ _id: Id }, data)
            console.log(noteData)
            res.json("notes updated")
    
        }
       
    } catch (error) {
        console.log(error)
        console.log("something went wrong")
    }

})
noteRoute.delete("/delete/:id", async (req, res) => {
    const data = req.body
    const ID = req.params.id
    const note=await Notemodel.findOne({ _id: ID })
    const userId_in_note=note.userId
    const userId_making_req=req.body.userId

    if(userId_making_req!==userId_in_note){
        res.json("you are not authorise")
    }else{
        let noteData = await Notemodel.findByIdAndDelete({ _id: ID })
        console.log(noteData)
        res.json(noteData)
    }
    

})


module.exports = { noteRoute }