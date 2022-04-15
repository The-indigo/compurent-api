let express = require('express');
let router = express.Router();

let basketController = require('../controllers/basket.controller');

router.post('/add/:id', basketController.addToBasket);

module.exports = router;
