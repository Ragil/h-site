/**
 * A backbone view that has a header and content.
 */
define(function(require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var check = require('check');
    var HeaderView = require('view/header/HeaderView');

    var template = require('text!view/app/AppView.html');
    var _instance = null;

    var AppView = Backbone.View.extend({

        className : 'appView',

        initialize : function(options) {
            check(options).strict().isObject();
            check(options.headerView).strict().isOfType(HeaderView);

            this.$el.html(_.template(template, {}));

            var headerView = options.headerView;
            var $el = this.$el;

            var $header = $el.children('.header');
            $header.append(headerView.$el);
        },

        remove : function() {
            this.$el.remove();
        }
    }, {
        getInstance : function() {
            _instance = _instance || new AppView({
                headerView : HeaderView.getInstance()
            });
            return _instance;
        }
    });

    return AppView;
});