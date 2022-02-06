const express = require('express');
const router = express.Router()
const PostController = require('../controllers/PostController');
const {authentication} = require("../middlewares/authentication");

router.post('/create',authentication, PostController.create);
router.get('/getByUsername/:name', PostController.getPostByUsername);
router.delete('/:_id',authentication, PostController.delete);
router.get('/getById/:id', PostController.getById);
router.post('/insert',PostController.insertComment);

module.exports = router;