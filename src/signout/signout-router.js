const express = require('express')
const passport = require('passport')
const signOutRouter = express.Router()

signOutRouter
    .route('/')
    .delete((req, res) => {
        req.logOut()
        res
            .status(204)
            .send('User has signed out!')
            .redirect('/signin')
    })

module.exports = signOutRouter