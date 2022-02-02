const express = require('express');
const router = express.Router()
const PostController = require('../controllers/PostController');

router.post('/create',PostController.create);
router.get('/', PostController.getAll);
router.get('/getByUsername', PostController.getPostByUsername);
router.delete('/:_id',PostController.delete)


module.exports = router;