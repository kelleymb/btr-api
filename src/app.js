require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const { SESSION_SECRET } = require('./config')
const signUpRouter = require('./signup/signup-router')
const signInRouter = require('./signin/signin-router')
const signOutRouter = require('./signout/signout-router')
const reviewsRouter = require('./reviews/reviews-router')
const addReviewRouter = require('./addreview/addreview-router')

const session = require('express-session')
const flash = require('express-flash')
const methodOverride = require('method-override')
const passport = require('passport')


const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))

const allowedOrigins = ['http://localhost:3000', 'https://btr-client-kelleymb.vercel.app']
app.use(helmet())
app.use(cors({
    exposedHeaders: 'Token', 
    origin: function(origin, callback) {
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not' + 'allow access from the specified Origin'
            return callback(new Error(msg), false)
        }
        return callback(null, true)
    }}))

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.set('trust proxy', 1)
app.use(session({
    uuid: function(req) {
        return uuid()
    },
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(methodOverride('method'))

//testing endpoints
app.get('/', (req, res) => {
    res.send('Home')
})
//testing endpoints
app.get('/api/*', (req, res) => {
    res.json({ok: true});
})

app.use('/signup', signUpRouter)
app.use('/signin', signInRouter)
app.use('/signout', signOutRouter)
app.use('/reviews', reviewsRouter)
app.use('/add', addReviewRouter)

//error handler middleware
app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: error.message } }
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