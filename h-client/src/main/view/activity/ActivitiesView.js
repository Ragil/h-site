/**
 * Displays the most recent activities. Activities include user signup, new
 * forums post, new video uploads, new replay upload.
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    var _ = require('underscore');
    var Backbone = require('backbone');
    var check = require('check');
    var ActivityCollection = require('view/activity/ActivityCollection');
    var ActivityView = require('view/activity/ActivityView');
    var template = require('text!view/activity/ActivitiesView.html');

    var _instance = null;

    var ActivitiesView = Backbone.View.extend({
        tagName : 'div',
        className : 'activitiesView',
        model : ActivityCollection,

        initialize : function(options) {
            check(options).strict().isObject();
            check(options.model).strict().isOfType(ActivityCollection);

            this.$el.html(_.template(template, {}));
            this.$activities = this.$el.find('.activities');

            options.model.on('all', this.render, this);
            this.render();
        },

        render : function() {
            var $activities = this.$activities;

            // clean up existing activities
            $activities.empty();

            // generate an ActivityView for each model in the collection
            this.model.each(function(model) {
                var activityView = new ActivityView({
                    model : model
                });
                $activities.append(activityView.$el);
            });
        },

        remove : function() {
            this.model.off('change', null, this);
            this.$el.remove();
        }

    }, {
        getInstance : function() {
            if (!_instance) {
                _instance = new ActivitiesView({
                    model : ActivityCollection.getInstance()
                });
            }
            return _instance;
        }
    });

    return ActivitiesView;

});