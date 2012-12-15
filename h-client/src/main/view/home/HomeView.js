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
    var ActivitiesView = require('view/activity/ActivitiesView');

    var template = require('text!view/home/HomeView.html');
    var _instance = null;

    var HomeView = Backbone.View.extend({

        className : 'homeView',

        initialize : function(options) {
            check(options).strict().isObject();
            check(options.headerView).strict().isOfType(HeaderView);
            check(options.videosView).strict().isOfType(VideosView);
            check(options.activitiesView).strict().isOfType(ActivitiesView);

            this.$el.html(_.template(template, {}));
            var $el = this.$el;

            $el.find('.header').append(options.headerView.$el);
            $el.find('.videos').append(options.videosView.$el);
            $el.find('.activities').append(options.activitiesView.$el);
        },

        remove : function() {
            this.$el.remove();
        }
    }, {
        getInstance : function() {
            _instance = _instance || new HomeView({
                headerView : HeaderView.getInstance(),
                videosView : VideosView.getInstance(),
                activitiesView : ActivitiesView.getInstance()
            });
            return _instance;
        }
    });

    return HomeView;
});