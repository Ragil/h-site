/* js/components/*.js */
module.exports = function(grunt) {

    // root directories
    var srcDir = 'src';
    var testDir = 'test';
    var targetDir = 'target';
    var thriftDir = srcDir + '/thrift';
    var localDir = targetDir + '/local';
    var distDir = targetDir + '/dist/';
    var deployDir = '../h-server/war/dist';
    var componentsDir = srcDir + '/components';

    // requirejs config file name
    var configJS = 'config.js';

    // global variables shared between build configurations
    var global = {
        srcLess : srcDir + '/view',
        srcHtml : srcDir + '/view/**/*.html',
        configJSFile : srcDir + '/' + configJS,

        bootstrap_less : componentsDir + '/bootstrap/less',
        elements_less : componentsDir + '/less-elements'
    };

    // local specific properties
    var local = {
        cssOut : localDir + '/css/optimized.css'
    };

    // production specific properties
    var dist = {
        jsOut : distDir + '/js/optimized.js',
        cssOut : localDir + '/css/optimized.css'
    };

    // less settings
    var localLessFiles = {};
    localLessFiles[local.cssOut] = global.srcLess + '/MainView.less';
    var distLessFiles = {};
    distLessFiles[local.cssOut] = global.srcLess + '/MainView.less';

    // copy files
    var srcJSFiles = [ srcDir + '/*.js' ];
    [ 'view', 'service', 'util' ].forEach(function(subDir) {
        srcJSFiles.push(srcDir + '/' + subDir + '/*.js');
        srcJSFiles.push(srcDir + '/' + subDir + '/**/*.js');
    });

    // copy settings
    var localCopyFiles = {};
    localCopyFiles[deployDir + '/js/'] = [ global.srcHtml, thriftDir + '/gen-js/*.js' ].concat(srcJSFiles);
    localCopyFiles[deployDir + '/js/components/'] = [ componentsDir + '/**' ];
    localCopyFiles[deployDir + '/css/'] = [ local.cssOut ];
    localCopyFiles[deployDir + '/index.html'] = [ 'local-index.html' ];

    // Project configuration.
    grunt.initConfig({
        clean : {
            target : targetDir,
            war : deployDir
        },

        lint : {
            all : [ 'grunt.js', testDir + '/*.js', testDir + '**/*.js' ]
                    .concat(srcJSFiles)
        },

        jshint : {
            options : {
                browser : true,
                laxbreak : true,
                curly : true,
                eqeqeq : true,
                immed : true,
                latedef : true,
                newcap : true,
                noarg : true,
                sub : true,
                boss : true,
                eqnull : true
            },
            globals : {
                jquery : true
            }
        },

        requirejs : {
            dist : {
                options : {
                    include : configJS,
                    baseUrl : srcDir,
                    mainConfigFile : global.configJSFile,
                    out : dist.jsOut
                }
            }
        },

        less : {
            local : {
                options : {
                    paths : [ global.srcLess, global.bootstrap_less,
                            global.elements_less ]
                },
                files : localLessFiles
            },
            dist : {
                options : {
                    paths : [ global.srcLess, global.bootstrap_less,
                            global.elements_less ],
                    compress : true
                },
                files : distLessFiles
            }
        },

        thrift : {
            files : [ thriftDir + '/ActivityService.thrift',
                    thriftDir + '/VideoService.thrift',
                    thriftDir + '/ReplayService.thrift',
                    thriftDir + '/UserService.thrift' ],
            languages : [ 'js' ],
            out : thriftDir
        },

        mocha : {
            index : [ testDir + '/index.html' ]
        },

        copy : {
            local : {
                files : localCopyFiles
            },
            dist : {
                files : {
                    '../h-server/war/dist/css/' : [ 'target/dist/css/**' ],
                    '../h-server/war/dist/js/' : [ 'target/dist/js/**' ]
                }
            },
            options : {
                minmatch : {
                    matchBase : true
                }
            }
        }
    });

    grunt.loadTasks('grunt-lib');
    grunt.loadNpmTasks('grunt-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-mocha');

    // Default task.
    grunt.registerTask('local', 'thrift lint mocha less:local copy:local');
    grunt.registerTask('default',
            'thrift lint mocha requirejs:dist less:dist copy:dist');
    grunt.registerTask('test', 'thrift lint mocha');
};