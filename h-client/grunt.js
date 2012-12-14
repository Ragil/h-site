module.exports = function(grunt) {

    var localDir = 'target/local/';
    var distDir = 'target/dist/';
    
    // Project configuration.
    grunt.initConfig({
        lint : {
            all : [ 'grunt.js', 'src/**/*.js', 'src/**/**/*.js',
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
                    out : localDir + 'optimized.js',
                    optimize : 'none'
                }
            },
            dist : {
                options : {
                    include : 'config.js',
                    baseUrl : 'src/main/',
                    mainConfigFile : 'src/main/config.js',
                    out : distDir + 'optimized.js'
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
                    'target/local/optimized.css' : 'src/main/view/MainView.less'
                }
            },
            dist : {
                options : {
                    paths : [ 'src/main/view/', 'components/bootstrap/less/',
                              'components/less-elements'],
                    compress : true
                },
                files : {
                    'target/dist/optimized.css' : 'src/main/view/MainView.less'
                }
            }
        },

        thrift: {
            files : ['src/main/thrift/ActivityService.thrift'],
            languages : ['js'],
            out : 'src/main/thrift'
        },
        
        mocha : {
            index : [ 'src/test/index.html' ]
        }
    });

    grunt.loadTasks('grunt-lib');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-mocha');

    // Default task.
    grunt.registerTask('local', 'lint requirejs:local less:local');
    grunt.registerTask('default', 'lint requirejs:dist less:dist');
    grunt.registerTask('test', 'lint thrift mocha');
};