var _ = require('underscore'),
    model = require('../lib/model');

function grouper(elem, index) {
    return Math.floor(index / 3);
}

module.exports = function(req, res) {
    model.list(req.path.substr(5), function(err, results) {
        res.render('list', {
            rows: _.chain(results).groupBy(grouper).toArray().value(),
            range: _.range(8)
        });
    });
};
