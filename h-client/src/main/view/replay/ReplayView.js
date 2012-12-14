define(function(require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var check = require('check');
    var Backbone = require('backbone');
    var ReplayCollection = require('view/replay/ReplayCollection');

    var _instance = null;

    var ReplayView = Backbone.View.extend({
        tagName : 'div',
        className : 'replayView',

        intiialize : function(options) {
            check(options).isObject();
            check(options.model).isOfType(ReplayCollection);
        }

    }, {
        getInstance : function() {
            if (!_instance) {
                _instance = new ReplayView({
                    model : ReplayCollection.getInstance()
                });
                _instance.fetch();
            }
            return _instance;
        }
    });

});