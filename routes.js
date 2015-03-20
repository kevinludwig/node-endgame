'use strict';

module.exports = function(app) {
    app.get('/', require('./controllers/index'));
    app.get('/detail*', require('./controllers/detail'));
    app.get('/list*', require('./controllers/list'));
    app.get('/pgn*', require('./controllers/pgn'));
};
