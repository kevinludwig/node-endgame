var _ = require('underscore'),
    dir = require('node-dir'),
    fs = require('fs'),
    async = require('async'),
    buildFenMap;

function makePair(filename, callback) {
    fs.readFile(filename, function(err, content) {
        var re = /\[FEN "(.*?)"\]/.exec(content),
            capture = re[1],
            fen = capture.split(/\s/)[0],
            pair = [fen, filename];
        callback(err, pair);
    });
}

buildFenMap = async.memoize(function(callback) {
    dir.files(__dirname + '/../pgn', function(err, files) {
        async.map(files, makePair, function(err, pairs) {
            callback(err, _.object(pairs));
        });
    });
});

module.exports = function(req, res) {
    var fen = req.path.substring(5);

    buildFenMap(function(err, map) {
        res.type('text/plain').sendFile(map[fen]);
    });
};
