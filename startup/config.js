const config = require("config");
const logger = require('./logger');

module.exports = function () {

	if (!config.get("jwtwebtoken")) {
        throw new Error('FATAL ERROR jwt not defined');
        //throw 'error' it means we cannot see stack trace of error
	}
};
module.exports = function () {
        
        if(!config.get('jwtwebtoken')){
            throw new Error('FATAL ERROR jwtwebtoken is not defined');
        }
}

module.exports = function () {
        if (!config.get('jwtwebtoken')) {
                throw new Error('FATAL ERROR jwtwebtoken is not defined');
        }

        else {
                logger.info('jwtwebtoken is defined');
        }
}


