const express = require('express')

const panelRouter = express.Router()

panelRouter
    .route('/')
    .get(res => {
        res
            .status(200).send('Login Successful')
    })
    
module.exports = panelRouter