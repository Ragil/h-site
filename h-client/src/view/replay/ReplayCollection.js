define(function(require) {

    var check = require('check');
    var Backbone = require('backbone');
    var replayService = require('replayService');
    var ReplayModel = require('view/replay/ReplayModel');

    var _instance = null;

    var ReplayCollection = Backbone.Collection.extend({
        model : ReplayModel,
        comparator : function(model) {
            return -model.get('created_ts');
        },

        save : function() {/* do nothing */},
        destroy : function() {/* do nothing */},

        sync : function(method, model, options) {
            // thrift rpc handlers
            var success = function(tReplays) {
                options.success(tReplays, undefined, options);
            };
            var error = function(tException) {
                options.error(model, tException, options);
            };

            // make thrift rpc call
            replayService.getReplays(success, error);
        }

    }, {
        getInstance : function() {
            if (!_instance) {
                _instance = new ReplayCollection();
                _instance.fetch();
            }
            return _instance;
        }
    });

    return ReplayCollection;

});