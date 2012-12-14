require.config({
    baseUrl : 'src/main/',
    deps : [ 'main' ],
    paths : {

        thrift : 'thrift/gen-js',
        test : '../test',

        // external libs
        jquery : "../../components/jquery/jquery",
        underscore : "../../components/underscore/underscore",
        backbone : "../../components/backbone/backbone",
        bootstrap : "../../components/bootstrap/docs/assets/js/bootstrap",
        text : "../../components/requirejs-text/text",
        mocha : "../../components/mocha/mocha",
        expect : "../../components/expect/expect",
        sinon : "../../components/sinon/sinon",

        // frequently used components
        eventBus : "util/eventBus",
        check : 'util/check',

        // services
        videoService : 'service/videoService',
        activityService : 'service/activityService',
        replayService : 'service/replayService'
    },

    shim : {
        backbone : {
            deps : [ 'underscore', 'jquery' ],
            exports : 'Backbone'
        },
        underscore : {
            exports : '_'
        },
        mocha : {
            exports : 'mocha'
        }
    }

});

var runMocha = function() {
    mocha.run();
};
