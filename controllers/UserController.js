const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {jwt_secret} = require('../config/keys');
const transporter = require("../config/nodemailer");
const { find } = require("../models/User");

const UserController = {
  async getAll(req, res) {
    const users = await User.find().populate("postId");
    res.send(users);
  },async getCurrentUser(req,res){
    const users = await User.findById(req.user._id);
    res.send(users);
  },
  async create(req, res) {
    try {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({ ...req.body, password: hash });
    //   const emailToken = jwt.sign({ email: req.body.email }, jwt_secret);
    //   const url = "http://localhost:3000/users/confirm/" + emailToken;
    //   await transporter.sendMail({
    //     to: req.body.email,
    //     subject: "Account verification",
    //     html: `<h2>Bienvenido, estás punto de registrarte </h2>
    //     <a href="${url}"> Click para confirmar tu registro!</a>
    //     `,
    //   });
      res.status(201).send({message: 'Usuario creado correctamente', user})}
         catch (error) {
      console.log(error);
      res.send("Algo ha ido mal");
    }
  },
  async login(req, res) {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    try {
      if (!user) {
        return console.log("Usuario o contraseña incorrecto");
      }
      const match = bcrypt.compareSync(req.body.password, user.password);
      if (!match) {
        return res.status(400).send({ message: "Usuario o contraseña incorrecto" });
      }
    //   if (!user.verified) {
    //     return res.status(400).send({ message: "Verifica tu cuenta." });
    //   }

      token = jwt.sign({ _id: user._id }, jwt_secret);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      res
        .status(201)
        .send(`welcome  ${user.name.toUpperCase()} token: ${token}`);
    } catch (error) {
      console.log(error);
    }
  },
  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "Has cerrado sesión." });
    } catch (error) {
      console.log(error);
    }
  },

  async confirm(req, res) {
    try {
      const token = req.params.emailToken;
      console.log(token);
      const payload = jwt.verify(token, jwt_secret);
      const user = await User.findOne({ email: payload.email });
      user.verified = true;
      user.save();
      res.status(201).send(user);
    } catch (error) {
      console.log(error);
    }
  },
  async findbyName(req, res) {
    try {
      const user = await User.find({
        name: { $regex: req.params.name, $options: "i" },
      });
      res.send(user);
    } catch (error) {
      console.log(error);
    }
  },
  async findById(req, res) {
    try {
      const user = await User.findById(req.params._id);
      if (!user) return res.send(`Usuario no encontrado`);
      res.send(user);
    } catch (error) {
      console.log(error);
    }
  },
  async follow(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params._id);
      const logged = req.user._id.toString();
      const followersId = user.followersId;
      const followers = user.followers;
      if (!user) return res.send("User not found");
      if (req.params._id == logged) return res.send("No te puedes seguir a tí mismo.");
      if (followersId.indexOf(req.user._id) != -1) {
        res.send("ya sigues a este usuario");
      } else {
        followers.push(req.user.name);
        followersId.push(logged);
      }
      user.save();
      res.send(user);
    } catch (error) {
      console.log(error);
    }
  },
  async unfollow(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params._id);
      const logged = req.user._id.toString();
      const exist = user.followersId.indexOf(logged);
      console.log(user.followersId, logged);
      if (exist != -1) {
        user.followersId.splice(exist, 1);
        user.followers.splice(exist, 1);
        user.save();
        res.send(user);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async myProfile(req, res) {
    try {
      const user = await User.findOneAndUpdate(req.user._id).populate("postId");
      user.followersId = user.followersId.length;
      res.send(user);
    } catch (error) {
      console.log(error);
    }
  },
  async updateUser(req, res) {
    try {
      const userid = { _id: req.user._id };
      const user = await User.updateOne(userid, req.body);
      const userInfo = await User.findById(req.user._id);
      if (req.file.originalname != userInfo.profileImg)
        userInfo.profileImg = req.file.originalname;

      userInfo.save();
      res.send("Tu usuario ha sido actualizado.");
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = UserController;