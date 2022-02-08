const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {jwt_secret} = require('../config/keys.js');
const UserController={
    async register(req,res){
        try{
            if(!req.body.name || !req.body.email || !req.body.password){
                return res.status(400).json({msg:'Por favor rellene los campos que faltan'});
            }
        
        const { password } = req.body;
        const hash = await bcrypt.hash( password, 10)
        const newUser = await User.create({...req.body, password: hash})
            res.status(201).send(newUser);
        }catch(error){
            console.error(error)
            res.status(500).send({message: 'Ha habido un problema al crear el usuario'})
        }

        if (user) {
            return res.status(400).send({ message: 'Este correo ya existe' });
        }
    },async getById(req, res) {
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
    },async logout(req, res) {
        try {
            await Token.destroy({
                where: {
                    [Op.and]: [
                        { UserId: req.user.id },
                        { token: req.headers.authorization }
                    ]
                }
            });
            res.send({ message: 'Desconectado con éxito' })
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'Hubo un problema al tratar de desconectarte' })
        }
    },async login(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email,
            })
          token = jwt.sign({_id: user._id}, jwt_secret);
            if (user.tokens.length>4) user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.send({ message: 'Bienvenid@ ' + user.name, token });
        } catch (error) {
            console.error(error);
        }
    }    
}
module.exports = UserController ;