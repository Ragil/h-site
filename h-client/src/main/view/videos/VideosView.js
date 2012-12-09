/**
 * Renders a carousel of youtube videos.
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var check = require('check');
    var VideoCollection = require('view/videos/VideoCollection');
    var VideoView = require('view/videos/VideoView');
    var template = require('text!view/videos/VideosView.html');
    require('bootstrap');

    var _instance = null;

    var VideosView = Backbone.View.extend({
        className : 'videosView',

        events : {
            'mouseover .carousel' : 'showCarouselBtn',
            'mouseleave .carousel' : 'hideCarouselBtn'
        },

        initialize : function(options) {
            check(options.model).strict().isOfType(VideoCollection);
            this.$el.html(_.template(template, {}));

            this.$carousel = this.$el.find('.carousel');
            this.$items = this.$el.find('.items');
            this.$carouselBtns = this.$el.find('.carousel-control');

            this.render();
        },

        render : function() {
            var $items = this.$items;
            var model = this.model;

            // clear all items
            $items.empty();

            // add each model as an item and make the first one active
            var first = true;
            model.each(function(video) {
                var videoView = new VideoView({
                    model : video
                });
                videoView.toogleActive(first);
                first = false;

                $items.append(videoView.$el);
            });

            // create a carousel using bootstrap
            this.$carousel.carousel({
                interval : false
            });

            // TODO - Remove carousel slider when youtube video is playing
            // TODO - handle carousel slide to stop youtube from playing
        },

        showCarouselBtn : function() {
            this.$carouselBtns.toggleClass('show', true);
            this.$carouselBtns.toggleClass('hide', false);
        },

        hideCarouselBtn : function() {
            this.$carouselBtns.toggleClass('show', false);
            this.$carouselBtns.toggleClass('hide', true);
        },

        remove : function() {
            this.$el.remove();
        }
    }, {
        getInstance : function() {
            _instance = _instance || new VideosView({
                model : VideoCollection.getInstance()
            });
            return _instance;
        }
    });

    return VideosView;

});