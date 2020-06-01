const express = require('express');
const router = express.Router();
const user = require('../controllers/UsersController');

router.get('/', user.getUsers);
router.get('/:id', user.getUserById);
router.post('/create', user.createUser);
router.post('/login', user.loginUser);

module.exports = router;
