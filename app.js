var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    favicon = require('serve-favicon'),
    compression = require('compression'),
    domainMiddleware = require('express-domain-middleware'),
    cluster = require('./lib/cluster'),
    log = require('./lib/logger'),
    config = require('config'),
    app = express(),
    server;

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(express.static(__dirname + '/public'));
app.use(domainMiddleware);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

require('./routes')(app);

app.use(require('express-domain-middleware'));

/*jshint unused:false */
app.use(function(err, req, res, next) {
    log.error(err, err.stack);

    res.send(500);

    if (err.domain) {
        process.kill(process.pid, 'SIGTERM');
    }
});
/*jshint unused:true */

function shutdown() {
    log.info('Initiating shutdown');
    server.close(function() {
        log.info('All connections closed cleanly');
        process.exit(1);
    });

    setTimeout(function() {
        log.info('Could not shutdown connections cleanly, hard exit');
        process.exit(1);
    }, 1000);
}

cluster(function() {
    server = app.listen(config.port, function() {
        log.info('pid %d listening on port %d', process.pid, config.port);
    });

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
});
