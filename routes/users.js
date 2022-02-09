const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const {auth} = require("../middlewares/tokenValidation");


router.get('/getAll', auth, UserController.getAll);
router.get('/getById/:id', auth, UserController.findById);
router.get("findByName/:name", auth, UserController.findbyName);
router.get("/confirm/:emailToken", UserController.confirm);
router.get("/options/profile", auth, UserController.myProfile);
router.get("/getCurrentUser/", auth, UserController.getCurrentUser);
router.post('/login', UserController.login);
router.post('/register', UserController.create);

router.put("/follow/:_id", auth, UserController.follow);
router.put("/logout", auth, UserController.logout);

module.exports = router;