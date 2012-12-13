define(function(require) {

    var check = require('check');
    var Backbone = require('backbone');
    var replayService = require('replayService');

    var ReplayModel = Backbone.Model.extend({
        idAttribute : '_id',
        save : function() {/* do nothing */},
        destroy : function() {/* do nothing */},

        sync : function(method, model, options) {
            // thrift rpc handlers
            var success = function(tReplay) {
                options.success(tReplay, undefined, options);
            };
            var error = function(tException) {
                options.error(model, tException, options);
            };

            // make thrift rpc call
            replayService.getReplay(success, error);
        }
    });

    return ReplayModel;

});