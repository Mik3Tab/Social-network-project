const User = require("../models/User");
const jwt = require('jsonwebtoken');
const {jwt_secret} = require('.config/keys.js');
const UserController={
    async create(req,res){
        try{
            const createUser = await User.create(...req.body)
            res.status(201).send(createUser)
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
    }
}
module.exports = UserController;