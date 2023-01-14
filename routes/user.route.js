const express = require("express")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {Usermodel}=require("../model/user.model")

const userroute = express.Router()

//  userroute.use(express.json())

userroute.post("/register", async (req, res) => {
    const { name, email, age, pass } = req.body
    const already = await Usermodel.findOne({ email })
    if (already) {
        res.json("already exist")
        console.log("already exist")
    } else {
        try {
            bcrypt.hash(pass, 5, async (err, secure_password) => {
                if (err) {
                    console.log(err)
                    res.send(err)
                } else {
                    const user = new Usermodel({ name, email, age, pass: secure_password })
                    await user.save()
                    res.json("registered")
                    console.log("registered")
                }
            });
        } catch (error) {
            res.send("error while registering")
            console.log(error)
        }
    }

})




userroute.post("/login", async (req, res) => {
    const { email, pass } = req.body
    try {

        // const user=await Usermodel.find({email:email,pass:pass})
        const user = await Usermodel.find({ email })

        console.log(user)
        if (user.length > 0) {
            let sec_pass = user[0].pass
            // console.log(user)
            bcrypt.compare(pass, sec_pass, (err, result) => {
                // result == true
                if (result) {

                    var token = jwt.sign({ userId: user[0]._id }, 'key',{expiresIn:"100h"});
                    console.log(token)        //
                    res.json({ "msg": "login successfull", "token": token })
                    console.log(user)
                } else {
                    console.log("wrong crendential")
                    console.log(err)
                    res.json({ "msg": "error " })
                }
            });

        } else {
            res.json("wrong credential")
        }
    } catch (error) {
        res.json("something went wrong")
        console.log(error)
    }
    // res.send("login")
})




module.exports = { userroute }