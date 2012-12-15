define(function(require) {

    var check = require('check');
    var Backbone = require('backbone');
    var replayService = require('replayService');

    var ReplayModel = Backbone.Model.extend({
        idAttribute : '_id',
        save : function() {/* do nothing */},
        destroy : function() {/* do nothing */},

        sync : function(method, model, options) {
            check(model).strict().isOfType(ReplayModel);
            check(model.get('id')).strict().isString();

            // thrift rpc handlers
            var success = function(tReplay) {
                options.success(tReplay, undefined, options);
            };
            var error = function(tException) {
                options.error(model, tException, options);
            };

            // make thrift rpc call
            replayService.getReplay(model.get('id'), success, error);
        },

        parse : function(tReplay) {
            return {
                id : tReplay.id,
                created_ts : tReplay.created_ts,
                title : tReplay.title,
                description : tReplay.description,
                uploader : tReplay.uploader,
                gameType : tReplay.gameType
            };
        }
    });

    return ReplayModel;

});