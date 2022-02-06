const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/register', UserController.register);
router.get('/getById/:id', UserController.getById);
router.delete('/castigao/:id',UserController.delete);
router.post('/login', UserController.login);

module.exports = router;