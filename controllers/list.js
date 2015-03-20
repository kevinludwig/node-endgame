var _ = require('underscore'),
    model = require('../lib/model');

function grouper(elem, index) {
    return Math.floor(index / 3);
}

function toObject(elem) {
    var n = elem.length,
        i = 0,
        c,
        color,
        m = {};
    while (i < n) {
        c = elem.charAt(i);
        if (c >= '0' && c <= '9') {
            i += parseInt(c, 10);
        } else if (c !== '/') {
            color = (c === c.toUpperCase()) ? 'w' : 'b';
            m[i] = '/img/' + color + c.toLowerCase(c) + '.png';
            i += 1;
        }
        else {
            i += 1;
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
