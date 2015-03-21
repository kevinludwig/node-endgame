'use strict';
var _ = require('underscore'),
    util = require('../lib/util');

module.exports = function(req, res) {
    var results = [
        {fen: "4K3/4P1k1/8/8/8/8/3r4/5R2", stm: 'w'},
        {fen: "4k3/R7/8/3KP3/8/8/8/7r", stm: 'b'}
    ];
    res.render('index', {
        results: results.map(util.toObject),
        range: _.range(8)
    });
};
