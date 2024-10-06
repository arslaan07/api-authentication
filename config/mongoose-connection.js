const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("connected to db")
    } catch (error) {
        console.error("mongo db connection error: ", error.message)
    }
    
}

module.exports = connectDB