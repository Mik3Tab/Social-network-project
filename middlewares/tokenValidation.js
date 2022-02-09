const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const {jwt_secret} = require('../config/keys');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, jwt_secret);
    const user = await User.findOne({ id: payload._id, tokens: token });
    if (!user) {
      return res.status(401).send({ message: "Not athorized", user });
    }
    req.user = user;
    console.log(user);
    next();
  } catch (error) {
    console.log(error);
  }
};
const author = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.send("You can not get access");
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
const Admin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, jwt_secret);
    const user = await User.findOne({ _id: payload._id });
    console.log(user);
    if (user.role != "admin") {
      return res.send("Forbidden");
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { auth, author, Admin };
