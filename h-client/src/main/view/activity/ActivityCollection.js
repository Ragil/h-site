/**
 * Displays the top ten most recent activity.
 */
define(function(require) {

    var Backbone = require('backbone');
    var check = require('check');
    var activityService = require('activityService');
    var ActivityModel = require('view/activity/ActivityModel');

    var _instance = null;

    var ActivityCollection = Backbone.Collection.extend({
        model : ActivityModel,
        save : function() {/* do nothing */},
        destroy : function() {/* do nothing */},

        // order by most recently created
        comparator : function(model) {
            return -model.get('created_ts');
        },

        sync : function(method, model, options) {
            check(method).strict().isString();
            check(model).strict().isOfType(ActivityCollection);

            // thrift success/error handlers
            var success = function(tActivities) {
                options.success(tActivities, undefined, options);
            };
            var error = function(tException) {
                options.error(model, tException, options);
            };

            // make thrift rpc call
            activityService.getLatestActivities(success, error);
        }

    }, {
        getInstance : function() {
            if (!_instance) {
                _instance = new ActivityCollection();
                _instance.fetch();
            }
            return _instance;
        }
    });

    return ActivityCollection;

});