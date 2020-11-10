const express = require('express');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const router = express.Router();

router.get('/signup', isNotLoggedIn, (req, res)=>{
    res.render('auth/signup');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
        successRedirect: '/profile',//Donde redirecciona en caso exitoso
        failureRedirect: '/signup', //Donde redireccionará en caso de fracaso
        failureFlash: true  //Permite a passport recibir mensajes en caso falle
    })   
);

router.get('/signin', isNotLoggedIn, (req, res)=>{
    res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, (req, res, next)=>{
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res)=>{
    req.logOut();
    res.redirect('/signin');
});

router.get('/profile', isLoggedIn, (req, res)=>{
    // res.send('This is your Profileeeeeeeeeee');
    res.render('profile');
});

module.exports = router;