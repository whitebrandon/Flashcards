// type nodemon in terminal to run app.js

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser()); // ← Express requires middleware (ie. cookie-parser) to read cookies
                         // https://www.npmjs.com/package/cookie-parser
app.use('/static', express.static('public'/* public is root */)); // Serves static files 
                                              // https://expressjs.com/en/4x/api.html#express.static
                                              // Syntax is: express.static(root, [options])
// ↑ in app.use('/static', express.st...) "/static" essentially stands in as the name for "public" 

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

/**
 * Sets pug as the default engine extension to use for redirects and rendering
 * https://expressjs.com/en/4x/api.html#app.set
 */
app.set('view engine', 'pug');

/************************************** NOTES ***************************************
app.use([path,] callback [, callback...])
path is optional, but is the path for which the middleware function is invoked
    can be: string, path pattern???, a regex to match paths, or an array of combos of all
callback is a function; and can be:
    a middleware function, a series of middleware functions separated by commas,
    an array of middleware functions, or a combo of all
    callback has three parameters: 1) request object, 2) response object 3) callback (named next())
        if next is not called (&& render is not called on response) server will cause browser to hang
        as it waits for the next() callback function to be invoked
if path is missing, the middleware function is executed for every request to the app
************************************************************************************/

app.use(mainRoutes);
app.use('/cards', cardRoutes);

// ↓ Error handling middleware: Takes four arguments
// https://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);
});

/**
 * Sets up server on localhost (127.0.0.1), port: 3000
 */
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});