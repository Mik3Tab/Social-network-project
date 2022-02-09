const express = require('express');
const router = express.Router()
const PostController = require('../controllers/PostController');
const {auth} = require("../middlewares/tokenValidation");

router.get('/findAll', PostController.find);
router.get('/findById/:id', PostController.findById);
router.get('/:title', PostController.findByName);
router.get('/id/:id', auth, PostController.findById);

router.put("/likes/_id", auth, PostController.like);

router.delete('/:_id',auth, PostController.delete);

router.post('/dislikes/:_id', auth, PostController.dislike);
router.post('/create',auth, PostController.create);


module.exports = router;