const express = require('express');
const router = express.Router()
const PostController = require('../controllers/PostController');
const {auth} = require("../middlewares/tokenValidation");

router.get('/findAll', PostController.find);
router.get('/findById/:_id', PostController.findById);
router.get('/findByName/:title', PostController.findByName);
router.get('/id/:id', auth, PostController.findById);

router.put("/like/:_id", auth, PostController.like);

router.delete('/:_id',auth, PostController.delete);

router.post('/dislike/:_id', auth, PostController.dislike);
router.post('/create',auth, PostController.create);
router.put('/comentario/:_id',auth,PostController.insertcomment);


module.exports = router;