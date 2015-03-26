'use strict';
var model = require('../lib/model');

function resultString(color, r) {
    if (r === '1/2-1/2') {
        return 'draw';
    } else if (r === '1-0' && color === 'w') {
        return 'win';
    } else if (r === '0-1' && color === 'b') {
        return 'win';
    } else {
        return 'lose';
    }
}

function makeTitle(color, result) {
    var s = color.toLowerCase() === 'w' ? 'White' : 'Black';
    return s + ' to play and ' + resultString(color, result);
}

function pgnText(games, stm) {
    if (games[stm].pgnText) {
        return games[stm].pgnText;
    } else if (stm === 'w') {
        return games.b.pgnText;
    } else {
        return games.w.pgnText;
    }
}

module.exports = function(req, res) {
    model.findGames(req.path.substr(8), function(err, games) {
        var stm = req.query.stm || 'w';
        res.render('detail', {
            makeTitle: makeTitle,
            pgnText: pgnText(games, stm),
            whiteResult: games.w && games.w.result,
            blackResult: games.b && games.b.result,
            sideToMove: stm === 'w' && games.w ? 'w' : 'b'
        });
    });
};
