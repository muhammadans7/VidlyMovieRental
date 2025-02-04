const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max: 1024,
      
    },
    isAdmin : Boolean
}); 

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin : this.isAdmin }, config.get('jwtwebtoken'));

    return token;
}


const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6).max(255)
    });

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;

