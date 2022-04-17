let express = require('express');
let router = express.Router();
let passport = require('passport');

let basketController = require('../controllers/basket.controller');

router.get('/',passport.authenticate('jwt', {session: false}), basketController.viewBasket);
router.get('/all',basketController.viewAllBasket);
router.post('/add/:deviceId', passport.authenticate('jwt', { session: false }), basketController.addToBasket);
router.get('/delete/:id',passport.authenticate('jwt', { session: false }), basketController.deleteBasketById);
router.delete('/', basketController.deleteBasket);


module.exports = router;
