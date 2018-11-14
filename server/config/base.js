let pkg = require("../../package.json");
let path = require("path");
module.exports = {
  app: {
    title: pkg.name,
    version: pkg.version,
    description: pkg.description,
    url: "http://0.0.0.0:" + (process.env.PORT || 3000) + "/"
    // googleAnalyticsID: "UA_xxxxx_x",
  },

  ip: process.env.NODE_IP || "0.0.0.0",
  port: process.env.PORT || 3000,
  rootPath: global.rootPath,

  logging: {
    console: {
      level: "debug"
    },

    file: {
      path: path.join("/var/log/"),
      level: "info",
      json: false
    }
  },
  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: "session_secret"
  },

  // List of user roles
  userRoles: ["guest", "user", "admin"],
  
 
};