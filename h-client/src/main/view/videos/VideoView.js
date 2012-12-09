/**
 * Renders a VideoModel assuming it is a youtube video.
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    var _ = require('underscore');
    var Backbone = require('backbone');
    var check = require('check');
    var VideoModel = require('view/videos/VideoModel');
    var template = require('text!view/videos/VideoView.html');

    var VideoView = Backbone.View.extend({
        tagName : 'div',
        className : 'item',

        initialize : function(options) {
            check(options).strict().isObject();
            check(options.model).strict().isOfType(VideoModel);

            var data = {
                id : options.model.get('id')
            };

            this.$el.html(_.template(template, data));
        },

        /*
         * Toggles this carousel element to be active or not active
         */
        toogleActive : function(active) {
            this.$el.toggleClass('active', active);
        },

        remove : function() {
            this.$el.remove();
        }
    });

    return VideoView;

});