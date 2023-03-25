let express = require('express');
let router = express.Router();
let passport = require('passport');

let computerController = require('../controllers/computer.controller');

router.get('/', computerController.getComputers);

router.get('/:id', computerController.getComputerById);

router.post('/add', passport.authenticate('jwt', {
    session: false
}), computerController.addComputers);

router.post('/edit/:id', computerController.updateComputer);

router.get('/delete/:id', passport.authenticate('jwt', {
    session: false
}), computerController.deleteComputer);


module.exports = router;