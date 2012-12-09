/**
 * A backbone view that has a header and content.
 */
define(function(require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var check = require('check');
    var HeaderView = require('view/header/HeaderView');
    var VideosView = require('view/videos/VideosView');

    var template = require('text!view/app/AppView.html');
    var _instance = null;

    var AppView = Backbone.View.extend({

        className : 'appView',

        initialize : function(options) {
            check(options).strict().isObject();
            check(options.headerView).strict().isOfType(HeaderView);
            check(options.videosView).strict().isOfType(VideosView);

            this.$el.html(_.template(template, {}));

            var headerView = options.headerView;
            var videosView = options.videosView;
            var $el = this.$el;

            var $header = $el.find('.header');
            $header.append(headerView.$el);

            var $videos = $el.find('.videos');
            $videos.append(videosView.$el);
        },

        remove : function() {
            this.$el.remove();
        }
    }, {
        getInstance : function() {
            _instance = _instance || new AppView({
                headerView : HeaderView.getInstance(),
                videosView : VideosView.getInstance()
            });
            return _instance;
        }
    });

    return AppView;
});