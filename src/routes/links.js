const express = require('express');
const router = express.Router();

const pool = require('../database'); //hace referencia a la db
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res)=>{
    res.render('links/add');
    res.json({mensaje: "Agregado"});
});

router.post('/add', isLoggedIn, async (req, res)=>{
    const {title, url, description} = req.body;

    const newLink = {
        title,
        url,
        description
    }

    await pool.query('INSERT INTO links set ?', [newLink]);

    // console.log(newLink);

    req.flash('success', 'Link saved successfully'); //name, value
    res.redirect('/links');
    res.json({mensaje: "Agregado"});
});

router.get('/lol', (req, res)=>{
    res.json({mensaje: "GGGGG"});
});

router.get('/edit/:id', isLoggedIn, async (req, res)=>{
    const {id} = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id= ?',[id]);
    console.log(links[0]);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res)=>{
    const {id} = req.params;
    const {title, url, description}= req.body;
    const newLink = {
        title,
        url,
        description
    }

    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link updated successfully'); //name, value
    res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res)=>{
    const links = await pool.query('SELECT * FROM links');
    console.log(links);
    res.render('links/list', {links});
});

router.get('/delete/:id', isLoggedIn, async(req, res)=>{
    console.log(req.params.id);
    const {id} = req.params;

    pool.query('DELETE FROM links WHERE id = ?', [id]);
    req.flash('success', 'Link deleted successfully'); //name, value
    res.redirect('/links');

    res.send('DELETED');    
});

module.exports = router;