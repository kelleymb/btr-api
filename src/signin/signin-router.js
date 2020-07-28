const express = require('express')
const passport = require('passport')
const randtoken = require('rand-token')
const SignInService = require('./signin-service')

const signInRouter = express.Router()
const jsonParser = express.json() 

signInRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        const { email, password } = req.body
        const user = { email, password }
        const token = randtoken.generate(32) 
        
        const initializePassport = require('./passport-config')
        
        initializePassport(
            passport, 
            email => user.find(user => user.email === email),
            id => user.find(user => user.id === id)
        )

        passport.authenticate('local', {
            successRedirect: '/add',
            failureRedirect: '/signin',
            failureFlash: true,
        })

        const knexInstance = req.app.get('db')
        SignInService.getUserNameByEmail(knexInstance, email)
            .then(userName => {
                console.log(userName)
                res
                    .setHeader('Username', userName)
            })

        res.setHeader('Token', token)
        res.send('User sign in successful')
    })


module.exports = signInRouter