/**
 * Renders an activity. Activity is displayed as part of a table and is a tr
 * element.
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    require('thrift/ActivityService_types');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var check = require('check');
    var ActivityModel = require('view/activity/ActivityModel');
    var template = require('text!view/activity/ActivityView.html');

    /*
     * td-left : Type td-center : Description
     */
    var ActivityView = Backbone.View.extend({
        tagName : 'tr',
        className : 'activityView',
        model : ActivityModel,

        initialize : function(options) {
            check(options).strict().isObject();
            check(options.model).strict().isOfType(ActivityModel);

            this.$el.html(_.template(template, {
                description : options.model.get('description')
            }));

            this.$type = this.$el.find('.type');
            this.$description = this.$el.find('.description');

            this.render();
        },

        render : function() {
            /*
             * type : [1 : New Video, 2 : New User, 3 : New Replay, 4 : New
             * Post] description : String
             */
            switch (this.model.get('type')) {
            case ActivityType.NEW_VIDEO:
                this.renderNewVideo();
                break;
            case ActivityType.NEW_USER:
                this.renderNewUser();
                break;
            case ActivityType.NEW_REPLAY:
                this.renderNewReplay();
                break;
            case ActivityType.NEW_POST:
                this.renderNewPost();
                break;
            }
        },

        renderNewVideo : function() {
            this.$type.text('Husky Cast');
            this.$el.toggleClass('success', true);
        },
        renderNewUser : function() {
            this.$type.text('Friend Joined');
            this.$el.toggleClass('info', true);
        },
        renderNewReplay : function() {
            this.$type.text('Cool Replay');
        },
        renderNewPost : function() {
            this.$type.text('Chatting');
        },

        remove : function() {
            this.$el.remove();
        }

    });

    return ActivityView;

});