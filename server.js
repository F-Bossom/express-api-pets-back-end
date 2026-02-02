// dotenv loads in our environment variables (into process.env)
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
// Bring in express
const express = require('express')
// Bring in Morgan  (logger)
const morgan = require('morgan')
const petsController = require("./controllers/pet.controller")

const app = express()

// Middleware
// connect mongo db *you can put this in a db/connection.js file
mongoose.connect(process.env.MONGODB_URI)

// Logs on connection
mongoose.connection.on('connected', ()=> {
    console.log(`Connected to mongodb on ${mongoose.connection.name}`)
})
// Logs on errors
mongoose.connection.on('error', (error)=> {
    console.log(`Mongoose had an error connecting ${error.message}`)
})

// Tell express we want to use JSON
app.use(express.json())
// Tell express we want ejs form 
// app.use(express.urlencoded({extended:true}))
// Morgan Logger
app.use(morgan('tiny'))

// ROUTE
app.get('/', (req, res) =>{
    res.json({ 
        message: "Please leave a message!"
    })
})

app.use(petsController)

app.listen(3000, ()=>console.log("Who let the dogs out on port 3000"))


