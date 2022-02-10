const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const {jwt_secret} = require('../config/keys.js')
const UserSchema = new moongose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    tokens: []
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;