const express = require("express")
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const jwtSecret = "wded"

router.post("/createuser", [
    body('email', "incorrect email").isEmail(),
    body("password", "incorrect password").isLength({ min: 5 }),
    body("name", "incorrect name").isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);
    
    let email = req.body.email;
    try {
        let userdata = await User.findOne({ email })
        
        if (userdata) {
            return res.status(400).json({ errors: "Already have an account with this email! Please try login" });
        }
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        })
        res.json({ success: true });
    } catch (e) {
        console.log(e);

        res.json({ success: false });
    }
})

router.post("/loginuser", [
    body('email', "incorrect email").isEmail(),
    body("password", "incorrect password").isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
        let userdata = await User.findOne({ email })
        
        if (!userdata) {
            return res.status(400).json({ errors: "Try logging with correct credetial" });

        }
        const pwtcompare = await bcrypt.compare(req.body.password,userdata.password)
         if (!pwtcompare) {
            return res.status(400).json({ errors: "Invalid password" });
        }
        const data = {
            user:{
                id:userdata.id
            }
        }
        const authToken = jwt.sign(data,jwtSecret);
        return res.json({ success: true,authToken:authToken });
    } catch (e) {
        console.log(e);
        res.json({ success: false });
    }
})

module.exports = router;