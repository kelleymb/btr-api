const express = require('express')
const signOutRouter = express.Router()

signOutRouter
    .route('/')
    .get((req, res) => {
        res.send('logout get request is working')
    })
    .delete((req, res) => {
        req.logOut()
        res.redirect('/signin')
    })

module.exports = signOutRouter