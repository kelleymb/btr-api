const express = require('express')
const passport = require('passport')

const signInRouter = express.Router()
const jsonParser = express.json() 

signInRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        const { email, password } = req.body
        const user = { email, password } 
        
        const initializePassport = require('./passport-config')
        

        initializePassport(
            passport, 
            email => user.find(user => user.email === email),
            id => user.find(user => user.id === id)
        )

        passport.authenticate('local', {
        successRedirect: '/panel',
        failureRedirect: '/signin',
        failureFlash: true,
        })
    })


module.exports = signInRouter