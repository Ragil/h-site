/**
 * Proxy for making rpc class to ReplayService.
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    require('thrift/UserService_types');
    require('thrift/ReplayService_types');

    var createFakeReplay = function(options) {
        return new Replay({
            id : options.id || 'id',
            created_ts : options.created_ts || 1,
            title : options.title || 'Cool Replay',
            description : options.description || 'Husky VS WhiteRa',
            uploader : options.uploader || new User({
                id : 'WhiteRa',
                name : 'WhiteRa'
            }),
            gameType : options.gameType || GameType.ONE_V_ONE
        });
    };

    var getReplays = function(success, error) {
        // TODO - impl
        success([ createFakeReplay({
            id : 'replay1',
            created_ts : 4
        }), createFakeReplay({
            id : 'replay2',
            created_ts : 3
        }), createFakeReplay({
            id : 'replay3',
            created_ts : 2
        }), createFakeReplay({
            id : 'replay4',
            created_ts : 1
        }) ]);
    };

    var getReplay = function(id, success, error) {
        // TODO - impl
        success(createFakeReplay({
            id : id
        }));
    };

    return {
        getReplays : getReplays,
        getReplay : getReplay
    };

});