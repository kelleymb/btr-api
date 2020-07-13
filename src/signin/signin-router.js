const express = require('express')
const passport = require('passport')

const signInRouter = express.Router()
const jsonParser = express.json() 

signInRouter
    .route('/')
    .get((req, res) => {
        res.send('User has logged out!')
    })
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

        res
            .status(200)
            .send('Login Successful!')
            .json(user)
    })


module.exports = signInRouter