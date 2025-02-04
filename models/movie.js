const mongoose = require('mongoose');
const Joi = require('joi');
const { genresSchema } = require('./genre');

// const Genre = mongoose.model('Genre', genresSchema);

const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 5,
        max: 30
    },
    genre: {
        type: genresSchema,
        required: true
    },
        
    numberInStock: {
        type: Number,
        default: 0
    },
    dailyRentalRate: {
        type: Number,
        default: 0
    }
});

const Movie = mongoose.model('Movie', moviesSchema);

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().required().min(3),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number(),
        dailyRentalRate: Joi.number()
    });

    return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;