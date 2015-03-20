'use strict';
var model = require('../lib/model');

module.exports = function(req, res) {
    var fen = req.path.substring(5),
        stm = req.query.stm || 'w';

    model.findGames(fen, function(err, games) {
        res.type('text/plain').send(games[stm] && games[stm].pgnText);
    });
};
