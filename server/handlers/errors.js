let config = require("../config");

module.exports = function(app) {
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        let err = new Error("Not Found");
        err.status = 404;
        next(err);
    });

    // development error handler
    // will print stacktrace
    if (config.isDevMode()) {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.json({
                error_message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: {}
        });
    });
};