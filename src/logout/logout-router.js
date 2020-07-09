const express = require('express')
const logoutRouter = express.Router()

logoutRouter
    .route('/')
    .get((req, res) => {
        res.send('logout get request is working')
    })
    .delete((req, res) => {
        req.logOut()
        res.redirect('/signin')
    })

module.exports = logoutRouter