const express = require('express')
const passport = require('passport')

const signinRouter = express.Router()
const jsonParser = express.json() 

signinRouter
    .route('/')
    .get((req, res) => {
        res.send('SignIn get request is working!')
    })
    .post(jsonParser, (req, res, next) => {
        const { email, password } = req.body
        const user = { email, password } 
        const knexInstance = req.app.get('db')
        console.log(req.body)
        
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
        

signinRouter
    .route('/logout')
    .get((req, res) => {
        res.send('Logout get request is working!')
    })
    .delete((req, res) => {
        req.logOut()
        req.redirect('/')
    })



module.exports = signinRouter