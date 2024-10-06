const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./config/mongoose-connection')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

db()

app.use("/api/auth", authRoutes)

app.listen(process.env.PORT || 3000)