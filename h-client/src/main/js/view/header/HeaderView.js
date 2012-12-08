/**
 * The header view of the application.
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var template = require('text!view/header/HeaderView.html');
    var _instance = null;

    var HeaderView = Backbone.View.extend({

        initialize : function(options) {
            var $el = this.$el;
            $el.html(_.template(template, {}));
        },

        remove : function() {
            this.$el.remove();
        }
    
    }, {
        getInstance : function() {
            _instance = _instance || new HeaderView();
            return _instance;
        }
    });

    return HeaderView;
});