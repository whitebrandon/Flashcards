// ↓ Import express module
const express = require('express');
// ↓ Creates a new Router object: https://expressjs.com/en/4x/api.html#express.router
const router = express.Router();

router.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name/* || req.cookies.username */) {
        res.render('index', {name}); // {name} is shortcut for {name: name} 
                                     // because prop and val have same name
    } else {
        res.redirect('/hello');
    }
});

router.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (!name/* || !req.cookies.username */) {
        res.render('hello');
    } else {
        res.redirect('/');
    }
})

router.post('/hello', (req, res) => {
    // res.cookie(name, value [, options]) | Sets cookie *name* to *value*
    res.cookie('username', req.body.username); // ← https://expressjs.com/en/4x/api.html#res.cookie
    res.redirect('/'); // Redirects to index.pug
})

router.post('/goodbye', (req, res) => {
    res.clearCookie('username'); // Clears username cookie
    res.redirect('/'); // Redirects to index.pug
});

module.exports = router;