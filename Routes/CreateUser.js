const express = require("express")
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require("express-validator")

router.post("/createuser", [
    body('email', "incorrect email").isEmail(),
    body("password", "incorrect password").isLength({ min: 5 }),
    body("name", "incorrect name").isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
        let userdata = await User.findOne({ email })
        
        if (userdata) {
            return res.status(400).json({ errors: "Already have an accont with this email! Please try login" });
        }
        await User.create({
            name: req.body.name,
            password: req.body.password,
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

        } else if (req.body.password !== userdata.password) {
            return res.status(400).json({ errors: "Invalid password" });
        }
        res.json({ success: true });
    } catch (e) {
        console.log(e);
        res.json({ success: false });
    }
})

module.exports = router;