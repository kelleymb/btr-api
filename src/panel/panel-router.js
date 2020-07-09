const express = require('express')
const PanelService = require('./panel-service')


const panelRouter = express.Router()


panelRouter
    .route('/')
    .get((req, res) => {
        
    })


module.exports = panelRouter