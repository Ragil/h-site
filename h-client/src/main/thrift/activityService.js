/**
 * Proxy for making rpc calls to ActivityService.
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    var check = require('check');

    // creates a fake activity for testing
    var createFakeActivity = function(id, created_ts, title, description) {
        check(id).strict().isString();
        check(created_ts).strict().isNumber();

        title = title || 'HOS WhiteRa vs Husky';
        description = description || 'WhiteRa does a mothership rush';
        return {
            id : id,
            created_ts : created_ts,
            title : title,
            description : description
        };
    };

    var getActivity = function(id, success, error) {
        // TODO impl
        succes(createFakeActivity(id, 1));
    };

    var getLatestActivities = function(success, error) {
        // TODO impl
        success([ createFakeActivity('activity1', 1),
                createFakeActivity('activity2', 2) ]);
    };

    return {
        getActivity : getActivity,
        getLatestActivities : getLatestActivities
    };

});