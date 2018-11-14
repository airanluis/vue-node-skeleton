let config = require("./config");
let logger = require("./core/logger");

/* GET home page. */
module.exports = function(app) {    

    
    // TODO: Add your routes

    // Handle errors
    require("./handlers/errors")(app);

};