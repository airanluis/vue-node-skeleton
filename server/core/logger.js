let winston = require("winston");
let moment = require("moment");
let config = require("../config");
let path = require("path");
/**
 * File transporter
 */

const dateFormat = function () {
	return moment().format("DD-MM-YYYY HH:mm:ss.SSS");
};

function customFileFormatter(options) {
	return options.timestamp() + "\t" + winston.config.colorize(options.level,options.level.toUpperCase()) + "\t-  ---\t" + (undefined !== options.message ? options.message : "");
}

let transports = [];

/**
 * Console transporter
 */
transports.push(new winston.transports.Console({
    level: config.logging.console.level,
    timestamp: dateFormat,
	colorize: true,
    prettyPrint: true,
    formatter: customFileFormatter,
	handleExceptions: process.env.NODE_ENV === "production"
}));

if (config.isProductionMode()) {
	transports.push(new winston.transports.File({
        level: config.logging.file.level,
        filename: path.join(config.logging.file.path, "server.log"),
        timestamp: dateFormat,
        prettyPrint: true,
        json: config.logging.file.json || false,
		formatter: customFileFormatter
    }));
}

let logger = new winston.Logger({
	level: "info",
	transports: transports,
	exitOnError: false
});

module.exports = logger;