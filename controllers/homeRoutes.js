const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require("../utils/auth");

router.get('/', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
      }
    
      res.render('login', {
        logged_in: false
      });
});

router.get('/homepage', async (req, res) =>{
    try {
      const postData = await Post.findAll({
        where: { user_id: req.session.user_id },
        include: [{ model: User, attributes: ["name"] }],
      });
      
      const posts = postData.map((post) => post.get({ plain: true }));
  
      res.render("homepage", {
        posts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get("/post/:id", withAuth, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          { model: User, attributes: ["name"] },
          {
            model: Comment,
            include: [{ model: User, attributes: ["name"] }],
          },
        ],
      });
      const post = postData.get({ plain: true });
      res.render("post", {
        ...post,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get("/dashboard", withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        where: { user_id: req.session.user_id },
        include: [{ model: User, attributes: ["name"] }],
      });
      
      const posts = postData.map((post) => post.get({ plain: true }));
  
      res.render("dashboard", {
        posts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get("/newpost", (req, res) => {
    if (req.session.logged_in) {
      res.render("newpost");
      return;
    }
    res.redirect("/login");
  });

router.get('/logout', async (req, res) =>{
    req.session.destroy(function(){
        res.redirect('/')
    })
})

module.exports = router;