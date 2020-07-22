const express = require('express')
const passport = require('passport')

const signInRouter = express.Router()
const jsonParser = express.json() 

signInRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        const { email, password } = req.body
        const user = { email, password } 
        
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

        // passport.authenticate('local', { failureRedirect: '/signin'}),
        //     function(req, res) {
        //         res.redirect('/add')
        //     }

        // passport.authenticate('local', function(err, user, info) {
        //     if (err) { return next(err); }
        //     // Redirect if it fails
        //     if (!user) { return res.redirect('/signin'); }
        //     req.logIn(user, function(err) {
        //       if (err) { return next(err); }
        //       // Redirect if it succeeds
        //       return res.redirect('/add');
        //     });
        //   })(req, res, next);

        res.json({ message: "user sign in successful" })
    })


module.exports = signInRouter