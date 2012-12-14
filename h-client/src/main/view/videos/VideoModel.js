define(function(require) {

    require('thrift/ActivityService_types');
    var Backbone = require('backbone');
    var check = require('check');
    var videoClient = require('videoService');

    // id - The youtube videoID
    // create_ts - The time of upload
    var VideoModel = Backbone.Model.extend({
        idAttribute : '_id',
        save : function() {/* do nothing */},
        destroy : function() {/* do nothing */},

        sync : function(method, model, options) {
            check(method).strict().isString();
            check(model).strict().isOfType(VideoModel);

            // thrift success/error handlers
            var onSuccess = function(tVideoModel) {
                options.success(tVideoModel, undefined, options);
            };
            var onError = function(tException) {
                options.error(model, tException, options);
            };
            // make a thrift call
            videoClient.getVideo(this.get('id'), onSuccess, onError);
        },

        parse : function(tVideoModel) {
            check(tVideoModel).strict().isOfType(YoutubeVideo);

            return {
                id : tVideoModel.id,
                created_ts : tVideoModel.created_ts
            };
        }

    });

    return VideoModel;

});