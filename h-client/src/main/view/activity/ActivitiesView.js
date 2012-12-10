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

    var _instance = null;

    var ActivitiesView = Backbone.View.extend({
        className : 'activityView',

        initialize : function(options) {
            check(options).strict().isObject();
            check(options.model).strict().isOfType(ActivityCollection);
        },

        remove : function() {
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