const Joi = require('joi');

module.exports = function () {
    
    Joi.objectId = require('joi-objectid')(Joi);
    
}

class Shape{
    constructor(color) {
        this.color = color;
    }
}