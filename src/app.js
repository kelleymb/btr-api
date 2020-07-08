require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { CLIENT_ORIGIN } = require('./config')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const signupRouter = require('./signup/signup-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(cors({origin: CLIENT_ORIGIN}))
app.use(helmet())

//testing endpoints
app.get('/', (req, res) => {
    res.send('Hello, world!')
})
//testing endpoints
app.get('/api/*', (req, res) => {
    res.json({ok: true});
})

// app.get('/signup', (req, res) => {
//     res.send('This signup works!')
// })

app.use('/signup', signupRouter)

//error handler middleware
app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app