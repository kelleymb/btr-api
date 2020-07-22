const express = require('express')
const signOutRouter = express.Router()

signOutRouter
    .route('/')
    .get((req, res) => {
        req.session.destroy()
        req.logOut()
        res.redirect('/')
    })

module.exports = signOutRouter