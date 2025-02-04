const mongoose = require('mongoose');
const Joi = require('joi');


const customerSchema = new mongoose.Schema({
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
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {

    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        phone: Joi.string().min(10).required(),
        isGold: Joi.boolean().required()
    });

    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;