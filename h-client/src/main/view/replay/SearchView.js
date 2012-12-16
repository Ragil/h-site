/**
 * Displays the search form for a replay.
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    var $ = require('jquery');
    var Backbone = require('backbone');
    var check = require('check');
    var ReplayCollection = require('view/replay/ReplayCollection');
    var template = require('text!view/replay/SearchView.html');

    var _instance = null;

    var SearchView = Backbone.View.extend({
        model : ReplayCollection,

        initialize : function(options) {
            check(options).strict().isObject();
            check(options.model).strict().isOfType(ReplayCollection);

            this.$el.html(_.template(template, {}));
        },

        remove : function() {
            this.$el.remove();
        }
    }, {
        getInstance : function() {
            if (!_instance) {
                _instance = new SearchView({
                    model : ReplayCollection.getInstance()
                });
            }
            return _instance;
        }
    });

    return SearchView;
});