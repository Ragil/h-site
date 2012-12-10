/**
 * Model for activities.
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    var activityService = require('activityService');
    var Backbone = require('backbone');

    var ActivityModel = Backbone.Model.extend({
        idAttribute : '_id',
        save : function() {/* do nothing */},
        destroy : function() {/* do nothing */},

        sync : function(method, model, options) {
            // thrift rpc handlers
            var success = function(tActivity) {
                options.success(tActivity, undefined, options);
            };
            var error = function(tException) {
                options.error(model, tException, options);
            };

            // make thrift rpc call
            activityService.getActivity(model.get('id'), success, error);
        }

    });

    return ActivityModel;

});