const jwt = require('jsonwebtoken')
const userModel = require('../models/user-model')

module.exports.protect = async (req, res, next) => {
    if(req.cookies.token) {
        try {
            let data = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY)
            let user = await userModel.findOne({email: data.email}).select("-password")
            if(!user) return res.status(401).send("unauthorized user")
            req.user = user
            next()
        } catch (error) {
            res.status(401).send("unauthorized user", error.message)
        }
    } else {
       return res.status(401).redirect("/login")
    }
    
}