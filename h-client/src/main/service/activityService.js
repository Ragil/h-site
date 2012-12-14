/**
 * Proxy for making rpc calls to ActivityService.
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    var check = require('check');

    /*
     * type : [1 : New Video, 2 : New User, 3 : New Replay, 4 : New Post]
     * description : String
     */
    // creates a fake activity for testing
    var createFakeActivity = function(id, created_ts, type, description) {
        check(id).strict().isString();
        check(created_ts).strict().isNumber();

        type = type || 1;
        description = description
                || 'WhiteRa does a mothership rush against Husky';
        return {
            id : id,
            created_ts : created_ts,
            type : type,
            description : description
        };
    };

    var getActivity = function(id, success, error) {
        // TODO impl
        succes(createFakeActivity(id, 1));
    };

    var getLatestActivities = function(success, error) {
        // TODO impl
        success([
                createFakeActivity('activity1', 1),
                createFakeActivity('activity2', 2, 2,
                        'Say Hi to Kurthugoschneider!'),
                createFakeActivity('activity3', 2, 3,
                        'Check out this awesome replay and tell us if '
                                + 'you want husky to cast it'),
                createFakeActivity('activity4', 2, 4,
                        'Mothership Core Energize!') ]);
    };

    return {
        getActivity : getActivity,
        getLatestActivities : getLatestActivities
    };

});