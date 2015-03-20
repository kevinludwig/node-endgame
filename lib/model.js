var _ = require('underscore'),
    dir = require('node-dir'),
    fs = require('fs'),
    async = require('async'),
    lookup;

function pair(filename, callback) {
    fs.readFile(filename, 'utf-8', function(err, content) {
        var re = /\[FEN "(.*?)"\]/.exec(content),
            capture = re[1],
            fen = capture.split(/\s/).slice(0, 2).join(' '),
            pair = [fen, content];
        callback(err, pair);
    });
}

lookup = async.memoize(function(callback) {
    dir.files(__dirname + '/../pgn', function(err, files) {
        async.map(files, pair, function(err, pairs) {
            callback(err, _.object(pairs));
        });
    });
});

exports.findGames = function(fen, callback) {
    lookup(function(err, map) {
        if (err) {
            callback(err);
        } else {
            var w = map[fen + ' w'],
                b = map[fen + ' b'],
                result = {
                    w: {
                        pgnText: w,
                        result: w && _.last(w.trim().split(/\n/))
                    },
                    b: {
                        pgnText: b,
                        result: b && _.last(b.trim().split(/\n/))
                    }
                };
            callback(null, result);
        }
    });
};

exports.list = async.memoize(function(type, callback) {
    dir.files(__dirname + '/../pgn/' + type, function(err, files) {
        async.map(files, pair, function(err, pairs) {
            callback(err, _.uniq(pairs.map(function(pair) {
                return _.first(pair).split(" ")[0];
            })));
        });
    });
});
