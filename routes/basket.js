let express = require('express');
let router = express.Router();
let passport = require('passport');

let basketController = require('../controllers/basket.controller');

router.post('/add/:deviceId',passport.authenticate('jwt', {session: false}), basketController.addToBasket);

module.exports = router;
