/**
 * Model for activities.
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    var check = require('check');
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
        },

        parse : function(tActivity) {
            check(tActivity).strict().isOfType(Activity);

            // convert to pure json model
            return {
                id : tActivity.id,
                created_ts : tActivity.created_ts,
                type : tActivity.type,
                description : tActivity.description
            };
        }

    });

    return ActivityModel;

});