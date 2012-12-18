define(function(require) {

    require('thrift/ReplayService_types');
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var template = require('text!view/replay/upload/UploadView.html');

    var _instance = null;

    var optionTemplate = '<option value=<%- value %>><%- type %></option>';
    var gameTypes = {};
    gameTypes[GameType.ONE_V_ONE] = '1 v 1';

    var UploadView = Backbone.View.extend({
        tagName : 'div',
        className : 'uploadView',

        initialize : function(options) {
            this.$el.html(_.template(template, {}));

            var $gameType = this.$el.find('.gameType');

            // render different gametype
            _.each(GameType, function(type, index) {
                $gameType.append(_.template(optionTemplate, {
                    type : gameTypes[type],
                    value : type
                }));
            });
        },

        remove : function() {
            this.$el.remove();
        }
    }, {
        getInstance : function() {
            _instance = _instance || new UploadView();
            return _instance;
        }
    });

    return UploadView;
});