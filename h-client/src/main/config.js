require.config({
    baseUrl : 'src/main/',
    deps : [ 'main' ],
    paths : {

        test : '../test',

        // external libs
        jquery : "../../components/jquery/jquery",
        underscore : "../../components/underscore/underscore",
        backbone : "../../components/backbone/backbone",
        text : "../../components/requirejs-text/text",
        mocha : "../../components/mocha/mocha",
        expect : "../../components/expect/expect",

        // frequently used components
        eventBus : "util/eventBus",
        check : 'util/check'
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
