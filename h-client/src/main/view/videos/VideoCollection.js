define(function(require) {

    var Backbone = require('backbone');
    var VideoModel = require('view/videos/VideoModel');
    var videoService = require('videoService');
    var check = require('check');

    var _instance = null;

    var VideoCollection = Backbone.Collection.extend({
        model : VideoModel,
        comparator : function(model) {
            return -model.get('created_ts');
        },

        sync : function(method, model, options) {
            check(method).strict().isString();
            check(model).strict().isOfType(VideoCollection);

            // thrift success/error handlers
            var onSuccess = function(tVideoModels) {
                options.success(tVideoModels, undefined, options);
            };
            var onError = function(tException) {
                options.error(model, tException, options);
            };
            // make a thrift call
            videoService.getLatestVideos(onSuccess, onError);
        }

    }, {
        getInstance : function() {
            if (!_instance) {
                _instance = new VideoCollection();
                _instance.fetch();
            }
            return _instance;
        }
    });

    return VideoCollection;

});