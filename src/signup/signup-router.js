const express = require('express')
const xss = require('xss')
const SignUpService = require ('./signup-service')

const signUpRouter = express.Router()
const jsonParser = express.json()

const bcrypt = require('bcrypt')
const saltRounds = 10

const serializeUser = user => ({
    id: user.id,
    user_name: xss(user.name),
    email: user.email,
    password: xss(user.password),
    created: user.created,
})

signUpRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        const { user_name, email, password } = req.body
        const newUser = { user_name, email, password }

        const knexInstance = req.app.get('db')

        if(!user_name) {
            return next({status: 400, message: '"Username is required"'})
        }

        if(!email) {
            return next({status: 400, message: '"Email address is required"'})
        }

        if (!password) {
            return next({status: 400, message: '"Password is required"'})
        }

        if (password.length > 60) {
            return next({status: 400, message: 'Oops! Password cannot exceed 60 characters.'})
        }

        bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
            newUser.password = hash
            SignUpService.insertUser(knexInstance, newUser)
            .then( user => {
                res
                    .status(201)
                    .send('User account created!')
                    .json(serializeUser(user))
            })
            .catch(next)
        })
        
    })


module.exports = signUpRouter