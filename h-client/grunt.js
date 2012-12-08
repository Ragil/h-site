module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        lint : {
            all : [ 'grunt.js', 'lib/**/*.js', 'test/**/*.js' ]
        },
        jshint : {
            options : {
                browser : true
            }
        },
        min : {
            dist : {
                src : [ 'src/main/js/**',
                        'components/backbone/backbone.js',
                        'components/jquery/jquery.js',
                        'components/require/require.js'],
                dest : 'target/dist/client.js'
            }
        },
        mocha : {
            index : [ 'src/test/index.html' ]
        }
    });

    grunt.loadNpmTasks('grunt-mocha');

    // Default task.
    grunt.registerTask('default', 'lint min');
    grunt.registerTask('test', 'lint mocha');
};