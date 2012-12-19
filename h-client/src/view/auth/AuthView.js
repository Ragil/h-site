/**
 * Displays user login/signup/profile screen.
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    var _ = require('underscore');
    var check = require('check');
    var Backbone = require('backbone');
    var HeaderView = require('view/header/HeaderView');
    var template = require('text!view/auth/AuthView.html');

    var _instance = null;

    var AuthView = Backbone.View.extend({
        tagName : 'div',
        className : 'authView',

        initialize : function(options) {
            check(options).strict().isObject();
            check(options.headerView).strict().isOfType(HeaderView);

            this.$el.html(_.template(template, {}));
            this.$header = this.$el.find('.header');

            this.$header.append(options.headerView.$el);
        },

        remove : function() {
            this.$el.remove();
        }
    }, {
        getInstance : function() {
            _instance = _instance || new AuthView({
                headerView : new HeaderView()
            });
            return _instance;
        }
    });

    return AuthView;

});