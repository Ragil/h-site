/**
 * Renders an activity.
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    var _ = require('underscore');
    var Backbone = require('backbone');
    var check = require('check');
    var ActivityModel = require('view/activity/ActivityModel');

    var ActivityView = Backbone.View.extend({
        className : 'activityView',

        initialize : function(options) {
            check(options).strict().isObject();
            check(options.model).strict().isOfType(ActivityModel);
        }

    });

    return ActivityView;

});