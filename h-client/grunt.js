module.exports = function(grunt) {

    var localDir = 'target/local/';
    var distDir = 'target/dist/';
    
    // Project configuration.
    grunt.initConfig({
        clean : {
            target : 'target/',
            war : '../h-server/war/dist/'
        },

        lint : {
            all : [ 'grunt.js',
                    'src/main/*.js', 'src/test/service/*.js',
                    'src/test/util/*.js',
                    'src/test/view/*.js',
                    'src/test/view/**/*.js',
                    'src/test/*.js', 'src/test/**/*.js',
                    'components/require/require.js',
                    'components/requirejs-text.js' ]
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
            local : {
                options : {
                    include : 'config.js',
                    baseUrl : 'src/main/',
                    mainConfigFile : 'src/main/config.js',
                    out : localDir + 'js/optimized.js',
                    optimize : 'none'
                }
            },
            dist : {
                options : {
                    include : 'config.js',
                    baseUrl : 'src/main/',
                    mainConfigFile : 'src/main/config.js',
                    out : distDir + 'js/optimized.js'
                }
            }
        },

        less : {
            local : {
                options : {
                    paths : [ 'src/main/view/', 'components/bootstrap/less/',
                              'components/less-elements/']
                },
                files : {
                    'target/local/css/optimized.css' : 'src/main/view/MainView.less'
                }
            },
            dist : {
                options : {
                    paths : [ 'src/main/view/', 'components/bootstrap/less/',
                              'components/less-elements'],
                    compress : true
                },
                files : {
                    'target/dist/css/optimized.css' : 'src/main/view/MainView.less'
                }
            }
        },

        thrift: {
            files : ['src/main/thrift/ActivityService.thrift',
                     'src/main/thrift/VideoService.thrift',
                     'src/main/thrift/ReplayService.thrift',
                     'src/main/thrift/UserService.thrift'],
            languages : ['js'],
            out : 'src/main/thrift'
        },

        mocha : {
            index : [ 'src/test/index.html' ]
        },

        copy : {
            local : {
                files : {
                    '../h-server/war/dist/js/src/main/' : [ 'src/main/**/*.js',
                                                            'src/main/*.js',
                                                            'src/main/**/*.html',
                                                         '  src/main/*.html'],
                    '../h-server/war/dist/css/' : [ 'target/local/css/**' ],
                    '../h-server/war/dist/js/components/' : [ 'components/**' ],
                    '../h-server/war/dist/index.html' : [ 'local-index.html' ]
                }
            },
            dist : {
                files : {
                    '../h-server/war/dist/css/' : ['target/dist/css/**'],
                    '../h-server/war/dist/js/' : ['target/dist/js/**']
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
    grunt.registerTask('local', 'clean thrift lint mocha less:local copy:local');
    grunt.registerTask('default', 'clean thrift lint mocha requirejs:dist less:dist copy:dist');
    grunt.registerTask('test', 'thrift lint mocha');
};