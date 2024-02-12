const router = require('express').Router();
const { Comment, Post, User } = require('../models');

router.get('/', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
      }
    
      res.render('login');
});

router.get('/dashboard', async (req, res) =>{
    res.render('dashboard');
});

router.get('/post', async (req, res) =>{
    res.render('post');
});

router.get('/homepage', async (req, res) =>{
    res.render('homepage');
});

module.exports = router;