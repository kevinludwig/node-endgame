var _ = require('underscore'),
    model = require('../lib/model');

function grouper(elem, index) {
    return Math.floor(index / 3);
}

function isDigit(c) {
    return c >= '0' && c <= '9';
}

function isUpper(c) {
    return c === c.toUpperCase();
}

function makeImage(c) {
    var color = isUpper(c) ? 'w' : 'b';
    return '/img/' + color + c.toLowerCase() + '.png';
}

function toObject(elem) {
    var n = elem.length,
        pos = 0,
        i,
        c,
        m = {};

    for (i = 0; i < n; i++) {
        c = elem.charAt(i);
        if (isDigit(c)) {
            pos += parseInt(c, 10);
        } else if (c !== '/') {
            m[pos] = makeImage(c);
            pos += 1;
        }
    }
    return {fen: elem, board: m};
}

module.exports = function(req, res) {
    model.list(req.path.substr(5), function(err, results) {
        res.render('list', {
            rows: _.chain(results).map(toObject).groupBy(grouper).toArray().value(),
            range: _.range(8)
        });
    });
};
