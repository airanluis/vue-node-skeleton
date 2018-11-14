let express = require("express");
let bodyParser = require("body-parser");
//Logger Format utilities
let logger = require("./core/logger");
let chalk = require("chalk");
let path = require("path");
let passport = require("passport");

let config = require("./config");

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

let session = require("express-session");

// Populates req.session
app.use(session({
  saveUninitialized: true,
  resave: false,
  secret: "atomic mouse",
  name: "demo.session",
  cookie: {
    // session expiration is set by default to one week
    maxAge: 7 * 24 * (60 * 60 * 1000),
    // httpOnly flag makes sure the cookie is only accessed
    // through the HTTP protocol and not JS/browser
    httpOnly: true
  }
}));

let favicon = require("serve-favicon");
let cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

// Webpack middleware in development mode

if (!config.isProductionMode()) {
  // serve pure static assets
  app.use("/static", express.static("./static"));
  let webpack = require("webpack");
  let wpConfig = require("../build/webpack.dev.conf");

  let compiler = webpack(wpConfig);
  let devMiddleware = require("webpack-dev-middleware");
  app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: wpConfig.output.publicPath,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    //stats: 'errors-only'
    stats: {
      colors: true
    }
  }));
  let hotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line
  app.use(hotMiddleware(compiler, {
    log: logger.info
  }));
} else {
  app.use("/", express.static(path.normalize(path.join(config.rootPath, "public"))));
  app.use("/static", express.static(path.normalize(path.join(config.rootPath, "public/static"))));
}

app.get("/", function (req, res) {
  res.sendFile("index.html");
});

// Protect app with Helmet
let helmet = require("helmet");
app.use(helmet({
  hsts: false
}));

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["*"],
    scriptSrc: ["*", "'unsafe-inline'", "'unsafe-eval'"],
    styleSrc: ["'self'", "'unsafe-inline'", "code.jquery.com", "maxcdn.bootstrapcdn.com", "fonts.googleapis.com"]
  }
}));

// Prepare Server
// Load port from properties
let port = config.port;

// Start server
app.listen(port);
logger.info("Server listening at port %s", port);
logger.info(config.app.title + " v" + config.app.version + " application started!");
logger.info("----------------------------------------------");
logger.info("Environment:\t" + chalk.underline.bold(process.env.NODE_ENV));
logger.info("IP:\t\t" + config.ip);
logger.info("Port:\t\t" + config.port);

// Exports the configuration
module.exports = app;

// Prepare routes and error handlers
require("./routes")(app);