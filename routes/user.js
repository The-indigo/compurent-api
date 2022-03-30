let express = require('express');
let router = express.Router();

let userController = require('../controllers/user.controller');

router.post('/login', userController.login );

router.post('/register', userController.register );

router.get('/logout', userController.logout );

module.exports = router;
