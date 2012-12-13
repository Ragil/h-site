define(function(require) {

    var createFakeReplay = function(options) {
        return {
            id : options.id || 'id',
            created_ts : options.created_ts || 1,
            title : options.title || 'Cool Replay',
            description : options.description || 'Husky VS WhiteRa',
            uploader : options.uploader || 'WhiteRa',
            gameType : options.gameType || '1 v 1'
        };
    };

    var getReplays = function() {

    };

    var getReplay = function() {

    };

    return {
        getReplays : getReplays,
        getReplay : getReplay
    };

});