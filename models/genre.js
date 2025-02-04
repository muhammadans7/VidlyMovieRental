const Joi = require('joi');
const mongoose = require('mongoose');

const genresSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 50
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 100
    }
});


const Genre = mongoose.model('Genre', genresSchema);

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(5).required()
    });

    return schema.validate(genre);
}

exports.genresSchema = genresSchema;
exports.Genre = Genre;
exports.validate = validateGenre;

