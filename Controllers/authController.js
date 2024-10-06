const userModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateToken')
module.exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        let user = await userModel.findOne({email})
        if(user) return res.status(400).send("user already exists")
        let salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(password, salt)
        user = await userModel.create({
            name,
            email,
            password: hashedPassword
        })
        let token = generateToken({email})
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        })
        res.status(201).send("user registered successfully")
        console.log("User registered successfully", user)
    } catch (error) {
        console.error("error registering user", error.message)
        res.status(500).send(error.message)
    }
    
}
module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await userModel.findOne({email})
        if(!user) return res.status(500).send("email or password incorrect")
        let result = await bcrypt.compare(password, user.password)
        if(result) {
            let token = generateToken({email})
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
            res.status(201).send("user login successfull")
        }
    } catch (error) {
        console.error("error logging in", error.message)
        res.status(500).send(error.message)
    }
    
}
module.exports.logoutUser = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
    })
    res.status(201).send("user logout successfull")}
module.exports.getUserProfile = (req, res) => {
    res.status(200).send(req.user)
}