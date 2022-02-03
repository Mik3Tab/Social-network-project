const express = require('express');
const router = express.Router()
const PostController = require('../controllers/PostController');
const {authentication} = require("../middlewares/authentication");

router.post('/create',authentication, PostController.create);
router.get('/getByUsername', PostController.getPostByUsername);
router.delete('/:_id',authentication, PostController.delete);

module.exports = router;