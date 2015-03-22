'use strict';
var _ = require('underscore'),
    util = require('../lib/util');

module.exports = function(req, res) {
    var results = [
        {fen: '8/8/8/8/4k3/8/R7/K7', stm: 'w'},
        {fen: '4K3/4P1k1/8/8/8/8/3r4/5R2', stm: 'w'},
        {fen: '4k3/R7/8/3KP3/8/8/8/7r', stm: 'b'},
        {fen: '8/8/5K2/3p4/3P4/1k6/8/8', stm: 'w'},
        {fen: '3k4/2r5/2B4R/3K4/8/8/8/8', stm: 'w'},
        {fen: '1k6/8/1K6/P7/3B4/8/8/8', stm: 'w'},
        {fen: '8/ppp5/8/PPP5/8/6k1/8/6K1', stm: 'w'}
    ];
    res.render('index', {
        results: results.map(util.toObject),
        range: _.range(8)
    });
};
