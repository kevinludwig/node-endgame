'use strict';
module.exports = function(grunt) {
    var files = ['Gruntfile.js', 'app.js', 'lib/**/*.js', 'controllers/**/*.js', 'test/**/*.js'];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ['coverage'],
        jshint: {
            files: files,
            options: {
                bitwise: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                freeze: true,
                nocomma: true,
                noarg: true,
                nonew: true,
                notypeof: true,
                shadow: false,
                undef: true,
                unused: true,
                node: true,
                mocha: true
            }
        },
        jscs: {
            src: files,
            options: {
                preset: 'google',
                validateIndentation: 4,
                requireCamelCaseOrUpperCaseIdentifiers: 'ignoreProperties',
                disallowMultipleVarDecl: null,
                requireMultipleVarDecl: 'onevar',
                maximumLineLength: {
                    value: 160,
                }
            }
        },
        jsbeautifier: {
            files: files
        },
        mocha_istanbul: {
            coverage: {
                src: 'test',
                options: {
                    'report-formats': 'html',
                    print: 'summary',
                    check: {
                        lines: 90,
                        functions: 90,
                        statements: 90,
                        branches: 80
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    grunt.registerTask('default', ['clean', 'jshint', 'jsbeautifier', 'jscs', 'mocha_istanbul']);
};
