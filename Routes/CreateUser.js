const express = require("express")
const router = express.Router()
const User = require('../models/User')

router.post("/createuser", async (req,res)=>{
    try{
        await User.create({
            name: "Vihanga Nirmitha",
            password:"12345",
            email:"vihanganirmitha@gmail.com",
            location:"Tissamaharama"
        })
        res.json({success:true});
    }catch(e){
            console.log(e);
            res.json({success:false});
    }
})

module.exports = router;