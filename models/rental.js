const mongoose = require('mongoose');
const Joi = require('joi');




const rentalSchema = new mongoose.Schema({


    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                min: 5,
                max: 100
        
            },
            isGold: { type: Boolean, default: false },
            phone: {
                type: String,
                required: true,
                min: 5,
                max: 100
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                min: 5,
                max: 30
            },
            genre: {
                type: new mongoose.Schema({
                    name: {

                        type: String,
                        required: true,
                        min: 5,
                        max: 50
                    }
                }),
               
            },
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },

    rentalFee: {
        type: Number,
        min: 0
    }

});

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
        dateOut: Joi.date(),
        dateReturned: Joi.date(),
        rentalFee: Joi.number()
    });

    return schema.validate(rental);
}


exports.Rental = Rental;
exports.validate = validateRental;
