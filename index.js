const express = require('express');
const app = express();

const logger = require('./startup/logger')
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();


const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}...`));




//process terminate when we do not caught exception






// hPX!W!4uvvtc$N4