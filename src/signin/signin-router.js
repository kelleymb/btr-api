const express = require('express')
const passport = require('passport')
const randtoken = require('rand-token')
// const jwt = require('jsonwebtoken')

const signInRouter = express.Router()
const jsonParser = express.json() 

signInRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        const { email, password } = req.body
        const user = { email, password }
        const token = randtoken.generate(32) 
        // const token = jwt.sign({  })
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

        // res.json({ message: "user sign in successful" })
        res.setHeader("Token", token)
        res.send(token)
    })


module.exports = signInRouter