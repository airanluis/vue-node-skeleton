"use strict";

let path = require("path");
let _ = require("lodash");
let chalk = require("chalk");

global.rootPath = path.normalize(path.join(__dirname, "..", ".."));
let externalProperties;

module.exports = {

    isDevMode() {
        return !process.env.NODE_ENV || process.env.NODE_ENV === "development";
    },

    isProductionMode() {
        return process.env.NODE_ENV === "production";
    },

    isTestMode() {
        return process.env.NODE_ENV === "test";
    }
};

let baseConfig = require("./base");

let config = {};
if (module.exports.isTestMode()) {
    config = require("./test");
} else if (module.exports.isDevMode()) {
    config = require("./dev");
} else if (module.exports.isProductionMode()) {
    config = require("./prod");
}

module.exports = _.defaultsDeep(config, baseConfig, module.exports);