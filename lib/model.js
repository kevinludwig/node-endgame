'use strict';
var _ = require('underscore'),
    dir = require('node-dir'),
    fs = require('fs'),
    async = require('async'),
    findGames,
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

findGames = exports.findGames = function(fen, callback) {
    lookup(function(err, map) {
        if (err) {
            callback(err);
        } else {
            var w = map[fen + ' w'],
                b = map[fen + ' b'],
                result = {
                    fen: fen,
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

function gameResult(r) {
    switch (r) {
        case '1-0':
            return '+';
        case '0-1':
            return '-';
        case '1/2-1/2':
            return '=';
    }
    return '';
}

exports.list = async.memoize(function(type, callback) {
    dir.files(__dirname + '/../pgn/' + type, function(err, files) {
        async.map(files, pair, function(err, pairs) {
            var fens = _.unique(pairs.map(function(pair) {
                return _.first(pair).split(/\s/)[0];
            }));
            async.map(fens, findGames, function(err, results) {
                callback(err, results.map(function(r) {
                    return {
                        fen: r.fen,
                        result: gameResult(r.w.result) + '/' + gameResult(r.b.result)
                    };
                }));
            });
        });
    });
});
