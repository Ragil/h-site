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
    var LoginView = require('view/auth/login/LoginView');
    var template = require('text!view/auth/AuthView.html');

    var _instance = null;

    var AuthView = Backbone.View.extend({
        tagName : 'div',
        className : 'authView',

        initialize : function(options) {
            check(options).strict().isObject();
            check(options.headerView).strict().isOfType(HeaderView);
            check(options.loginView).strict().isOfType(LoginView);

            this.loginView = options.loginView;
            this.headerView = options.headerView;

            this.$el.html(_.template(template, {}));
            this.$header = this.$el.find('.header');
            this.$content = this.$el.find('.content');

            this.$header.append(options.headerView.$el);
            this.$content.append(options.loginView.$el);

            options.headerView.setActiveView(HeaderView.VIEW.MYACCOUNT);
        },

        remove : function() {
            this.headerView.remove();
            this.loginView.remove();
            this.$el.remove();
        }
    }, {
        getInstance : function() {
            _instance = _instance || new AuthView({
                headerView : new HeaderView(),
                loginView : new LoginView()
            });
            return _instance;
        }
    });

    return AuthView;

});