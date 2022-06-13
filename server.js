const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const helmet = require('helmet')

const mongoConfig = require('./config/mongoConfig')
const contactRouter = require('./routes/contactRouter')
const usersRouter = require('./routes/usersRouter')
const contactAuthRouter = require('./routes/contactAuthRouter')

const app = express()
const PORT = 5001

// Middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())

//Routers
app.use('/contacts', contactRouter)
app.use('/users', usersRouter)
app.use('/auth', contactAuthRouter)

//Root Route created for app
app.get('/', (req, res) =>{
    res.status(200).json('Welcome')
})



app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
    mongoConfig()
})