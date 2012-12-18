/**
 * Displays a replay as row entry in the replay table
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var check = require('check');
    var Backbone = require('backbone');
    var ReplayModel = require('view/replay/ReplayModel');
    var template = require('text!view/replay/ReplayView.html');

    var ReplayView = Backbone.View.extend({
        model : ReplayModel,
        tagName : 'tr',
        className : 'replay',

        initialize : function(options) {
            check(options).strict().isObject();
            check(options.model).strict().isOfType(ReplayModel);

            var model = options.model;
            this.$el.html(_.template(template, {
                title : model.get('title'),
                description : model.get('description'),
                uploader : model.get('uploader').name,
                gametype : model.get('gameType')
            }));
        },

        remove : function() {
            this.$el.remove();
        }
    });

    return ReplayView;
});