module.exports = function(app) {
    app.get('/', require('./controllers/index'));
    app.get('/detail/:id', require('./controllers/detail'));
    app.get('/pgn*', require('./controllers/pgn'));
};
