'use strict';
var _ = require('underscore'),
    util = require('../lib/util'),
    model = require('../lib/model');

function convert(res) {
    return _.extend(res, {stm: 'w'});
}

module.exports = function(req, res) {
    model.list(req.path.substr(5), function(err, results) {
        res.render('list', {
            results: results.map(convert).map(util.toObject),
            range: _.range(8)
        });
    });
};
