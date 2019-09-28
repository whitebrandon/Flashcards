// ↓ Import express module
const express = require('express');
// ↓ Creates a new Router object: https://expressjs.com/en/4x/api.html#express.router
const router = express.Router();

// (const {variable} = Object) === (const variable = Object.variable)
const {data} = require('../data/flashcardData.json');
const {cards} = data;

/**
 * For GET requests
 * If url path equals protocol/domain_name/port/path where path is equal to "/", then:
 * *res*POND by redirecting to protocol/domain_name/port/cards/${randomNumber}
 */
router.get('/', (req, res) => {
    const numberOfCards = cards.length;
    const flashcardId = Math.floor(Math.random() * numberOfCards);
    console.log('redirecting...');
    res.redirect(`/cards/${flashcardId}`);
});

router.get('/:id', (req, res) => {
    const {side} = req.query;
    const {id} = req.params; // Params is a property of the *req*UEST object and its value is an object
                             // which with a property of id (which is the name given in the get path), so
                             // whatever value/character that sits in that spot is the value of id
    const name = req.cookies.username
    if (!side) {
        return res.redirect(`/cards/${id}?side=question`);
    }
    const {hint} = cards[id];
    const templateData = {id, name, side};
    
    if (side === "question") {
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
    } else if (side === 'answer') {
        templateData.sideToShow = 'question';
    }
    res.render('card', templateData);
});

module.exports = router;