var cluster = require('cluster'),
    log = require('./logger'),
    nCPU = require('os').cpus().length;

module.exports = function(fn) {
    if (cluster.isMaster) {
        for (var i = 0; i < nCPU; i++) {
            cluster.fork();
        }
        cluster.on('exit', function(worker /*,code,sig*/) {
            log.info('worker', worker.process.pid, 'died, restarting...');
            cluster.fork();
        });
    } else {
        fn();
    }
};
