const mongoose = require('mongoose');

const UserSchema = new moongose.Schema({
    name: String,
    email: String,
    password: String,
    Confirmed: Boolean
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;