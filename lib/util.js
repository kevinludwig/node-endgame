'use strict';
var _ = require('underscore');

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

exports.toObject = function(elem) {
    var n = elem.fen.length,
        pos = 0,
        i,
        c,
        m = {};

    for (i = 0; i < n; i++) {
        c = elem.fen.charAt(i);
        if (isDigit(c)) {
            pos += parseInt(c, 10);
        } else if (c !== '/') {
            m[pos] = makeImage(c);
            pos += 1;
        }
    }
    return {fen: elem.fen, board: m, result: "=/=", stm: elem.stm};
};
