require.config({
    baseUrl : 'src/',
    deps : [ 'main' ],
    paths : {

        Thrift : 'thrift/thrift',
        thrift : 'thrift/gen-js',
        test : '../test',

        // external libs
        jquery : "components/jquery/jquery",
        underscore : "components/underscore/underscore",
        backbone : "components/backbone/backbone",
        bootstrap : "components/bootstrap/docs/assets/js/bootstrap",
        text : "components/requirejs-text/text",
        mocha : "components/mocha/mocha",
        expect : "components/expect/expect",
        sinon : "components/sinon/sinon",

        // frequently used components
        eventBus : "util/eventBus",
        check : 'util/check',
        events : 'util/events',

        // services
        videoService : 'service/videoService',
        activityService : 'service/activityService',
        replayService : 'service/replayService',
        userService : 'service/userService',
        tErrors : 'thrift/gen-js/Errors_types'
    },

    shim : {
        backbone : {
            deps : [ 'underscore', 'jquery' ],
            exports : 'Backbone'
        },
        underscore : {
            exports : '_'
        },
        tErrors : {
            deps : [ 'Thrift' ],
            exports : 'tErrors'
        },
        mocha : {
            exports : 'mocha'
        }
    }

});

var runMocha = function() {
    mocha.run(function() {
        if (typeof window.__$coverObject !== 'undefined') {
            var reporter = new JSCovReporter({
                coverObject : window.__$coverObject
            });
        }
    });
};
