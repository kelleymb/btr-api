const express = require('express')
const passport = require('passport')
// const SignInService = require('./signin-service')

const signinRouter = express.Router()
const jsonParser = express.json()


// LINES 7-19 MOVED INTO .POST()
// const { email, password } = req.body
// const user = { email, password } 
// const knexInstance = req.app.get('db')

// const initializePassport = require('../passport-config')

// initializePassport(
//     knexInstance,
//     passport, 
//     email => user.find(user => user.email === email),
//     id => user.find(user => user.id === id)
// )    

signinRouter
    .route('/')
    .get((req, res) => {
        res.send('SignIn get request is working!')
    })
    .post(jsonParser, (req, res, next) => {
        const { email, password } = req.body
        const user = { email, password } 
        const knexInstance = req.app.get('db')
        
        const initializePassport = require('../passport-config')
        
        
        // initializePassport(
        //     passport, 
        //     SignInService.getByUserEmail(knexInstance, user),
        //     SignInService.getByUserId(knexInstance, user)
        // )


        initializePassport(
            passport, 
            email => user.find(user => user.email === email),
            id => user.find(user => user.id === id)
        )

        // SignInService.getByUserEmail(knexInstance, initializePassport(
        //     passport
        //     email => user.find(user => user.email === email)
        // ))

        // SignInService.getByUserId(knexInstance, initializePassport(
        //     passport
        //     id => user.find(user => user.id === id)
        // ))
        
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
        

signinRouter
    .route('/logout')
    .get((req, res) => {
        res.send('Logout get request is working!')
    })
    .delete( (req, res) => {
        req.logOut()
        req.redirect('/')
    })



module.exports = signinRouter