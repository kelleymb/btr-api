require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { CLIENT_ORIGIN } = require('./config')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const signupRouter = require('./signup/signup-router')
const signinRouter = require('./signin/signin-router')

const session = require('express-session')
const flash = require('express-flash')
const methodOverride = require('method-override')
const passport = require('passport')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(cors({origin: CLIENT_ORIGIN}))
app.use(helmet())

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('method'))

//testing endpoints
app.get('/', (req, res) => {
    res.send('Hello, world!')
})
//testing endpoints
app.get('/api/*', (req, res) => {
    res.json({ok: true});
})

app.use('/signup', signupRouter)
app.use('/signin', signinRouter)

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

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


module.exports = app