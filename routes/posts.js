const express = require('express');
const router = express.Router()
const PostController = require('../controllers/PostController');
const {authentication} = require("../middleware/authentication");

router.post('/create',authentication, PostController.create);
router.get('/', PostController.getAll);
router.get('/', PostController.getById);
router.get('/getByUsername', PostController.getPostByUsername);
router.put('/update', authentication, PostController.update);
router.delete('/:_id',authentication, PostController.delete);

module.exports = router;