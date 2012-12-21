/* js/components/*.js */
module.exports = function(grunt) {

    // unique build id
    var hash = new Date().getTime();

    // root directories
    var srcDir = 'src';
    var testDir = 'test';
    var targetDir = 'target';
    var srcCovDir = 'src-cov';
    var thriftDir = srcDir + '/thrift';
    var localDir = targetDir + '/local';
    var distDir = targetDir + '/dist/';
    var deployDir = '../h-server/war/dist';
    var componentsDir = srcDir + '/components';

    // requirejs config file name
    var configJS = 'config.js';
    var requireJSFile = componentsDir + '/require/require.js';

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
        indexOut : localDir + '/index.html',
        cssOut : localDir + '/css/optimized.css'
    };

    // production specific properties
    var dist = {
        indexOut : distDir + '/index.html',
        jsOut : distDir + '/js/' + hash + '.js',
        cssOut : distDir + '/css/' + hash + '.css',
        requireJS : 'r' + new Date().getTime() + '.js'
    };

    // less settings
    var lessPaths = [ global.srcLess, global.bootstrap_less,
            global.elements_less ];
    var localLessFiles = {};
    localLessFiles[local.cssOut] = global.srcLess + '/MainView.less';
    var distLessFiles = {};
    distLessFiles[dist.cssOut] = global.srcLess + '/MainView.less';

    // copy files
    var srcJSFiles = [ srcDir + '/*.js' ];
    [ 'view', 'service', 'util' ].forEach(function(subDir) {
        srcJSFiles.push(srcDir + '/' + subDir + '/*.js');
        srcJSFiles.push(srcDir + '/' + subDir + '/**/*.js');
    });

    // local copy settings
    var localCopyFiles = {};
    localCopyFiles[deployDir + '/js/'] = [ global.srcHtml,
            thriftDir + '/gen-js/*.js' ].concat(srcJSFiles);
    localCopyFiles[deployDir + '/js/components/'] = [ componentsDir + '/**' ];
    localCopyFiles[deployDir + '/css/'] = [ local.cssOut ];
    localCopyFiles[deployDir + '/index.html'] = [ local.indexOut ];

    // prod copy settings
    var distCopyFiles = {};
    distCopyFiles[deployDir + '/js/'] = distDir + '/js/*';
    distCopyFiles[deployDir + '/css/'] = distDir + '/css/*';
    distCopyFiles[deployDir + '/index.html'] = distDir + '/index.html';

    // Project configuration.
    grunt.initConfig({
        clean : {
            target : targetDir,
            war : deployDir,
            instrument : 'src-cov',
            instrument_target : targetDir + '/src-cov'
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
                    out : dist.jsOut,
                    preserveLicenseComments : false
                }
            },
            amd : {
                options : {
                    include : 'require.js',
                    baseUrl : componentsDir + '/require',
                    out : distDir + '/js/' + dist.requireJS,
                    preserveLicenseComments : false
                }
            }
        },

        less : {
            local : {
                options : {
                    paths : lessPaths
                },
                files : localLessFiles
            },
            dist : {
                options : {
                    paths : lessPaths,
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
            languages : [ 'js:jquery' ],
            out : thriftDir
        },

        cover : {
            compile : {
                files : {
                    'target/src-cov/*.js' : srcJSFiles
                }
            }
        },

        mocha : {
            index : [ testDir + '/index.html' ]
        },

        copy : {
            instrument : {
                files : {
                    'src-cov/' : 'target/src-cov/src/**',
                    'src-cov/view/' : global.srcHtml,
                    'src-cov/components/' : componentsDir + '/**',
                    'src-cov/thrift/gen-js/' : thriftDir + '/**/*.js'
                }
            },
            local : {
                files : localCopyFiles
            },
            dist : {
                files : distCopyFiles
            }
        },

        // generate index.html
        index : {
            local : {
                src : 'local-index.html',
                dest : local.indexOut,
                data : {
                    css : 'optimized.css',
                    js : 'config.js'
                }
            },
            dist : {
                src : 'prod-index.html',
                dest : dist.indexOut,
                data : {
                    hash : hash,
                    amd : dist.requireJS
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
    grunt.registerTask('instrument',
            'clean:instrument cover copy:instrument clean:instrument_target');

    grunt.registerTask('test-cov', 'clean thrift lint instrument mocha');
    grunt.registerTask('test', 'test-cov clean:instrument');

    grunt.registerTask('local', 'test-cov less:local index:local copy:local');
    grunt.registerTask('dist',
            'test requirejs:dist requirejs:amd less:dist index:dist copy:dist');
    grunt.registerTask('default', 'test-cov');
};
