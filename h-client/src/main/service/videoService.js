/**
 * Proxy for managing thrift clients and making thrift calls.
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
// TODO - implementation
define(function(require) {

    require('thrift/VideoService_types');
    require('thrift/VideoService');

    var createFakeVideo = function(id, created_ts) {
        return new YoutubeVideo({
            id : id,
            created_ts : created_ts
        });
    };

    var getVideo = function(id, success, error) {
        success(createFakeVideo('7xsc24h9Kzs', 3));
    };

    var getLatestVideos = function(success, error) {
        success([ createFakeVideo('7xsc24h9Kzs', 3),
                createFakeVideo('BOHcV9O-yBs', 2) ]);
    };

    return {
        getVideo : getVideo,
        getLatestVideos : getLatestVideos
    };
});