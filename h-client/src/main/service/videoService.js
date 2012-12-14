/**
 * Proxy for managing thrift clients and making thrift calls.
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
// TODO - implementation
define(function(require) {

    var getVideo = function(id, success, error) {
        success({
            id : '7xsc24h9Kzs',
            created_ts : 3
        });
    };

    var getLatestVideos = function(success, error) {
        success([ {
            id : '7xsc24h9Kzs',
            created_ts : 3
        }, {
            id : 'BOHcV9O-yBs',
            created_ts : 2
        } ]);
    };

    return {
        getVideo : getVideo,
        getLatestVideos : getLatestVideos
    };
});