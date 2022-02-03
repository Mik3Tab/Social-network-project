const User = require("../models/User");
const jwt = require('jsonwebtoken');
const {jwt_secret} = require('../config/keys.js');
const UserController={
    async create(req,res){
        try{
            const user = await User.create({...req.body,role:'user'})
            res.status(201).send(user);
        }catch(error){
            console.error(error)
            res.status(500).send({message: 'Ha habido un problema al crear el usuario'})
        }
    }, async getById(req, res) {
        try {
            const user = await user.findById(req.params._id)
            res.send(user)
        } catch (error){
            console.error(error);
        }
    }, async delete(req, res) {
        try {
            const user = await user.findByIdAndDelete(req.params._id)
            res.send({ user, message: 'Usuario borrado' })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Hubo algún problema al borrar el usuario.' })
        }
    },async login(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email,
            })
          token = jwt.sign({ _id: user._id }, jwt_secret);;
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.send({ message: 'Bienvenid@ ' + user.name, token });
        } catch (error) {
            console.error(error);
        }
    }
    
}
module.exports = UserController;