var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    favicon = require('serve-favicon'),
    compression = require('compression'),
    errorHandler = require('errorhandler'),
    cluster = require('./lib/cluster'),
    log = require('./lib/logger'),
    config = require('config'),
    app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

require('./routes')(app);

app.use(errorHandler());

cluster(function() {
    app.listen(config.port, function() {
        log.info('pid %d listening on port %d', process.pid, config.port);
    });
});
