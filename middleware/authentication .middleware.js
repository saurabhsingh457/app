const jwt=require("jsonwebtoken")

const authentication=async(req,res,next)=>{
    try {
        const token=req.headers.authorization
        if(token){
            const decode=jwt.verify(token,process.env.key)
            if(decode){
                const userId=decode.userId
                req.body.userId=userId
                next()
            }else{
                console.log("error while login")
                // res.status(505).json("error")
                res.json("invalid token")
            }
        }
    } catch (error) {
        // res.status(500).json({message:"invalid credn"})
        console.log(error)
        res.json("invalid")
    }
}

module.exports={authentication}