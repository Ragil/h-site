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
    var SignupView = require('view/auth/signup/SignupView');
    var template = require('text!view/auth/AuthView.html');

    var _instance = null;

    var AuthView = Backbone.View.extend({
        tagName : 'div',
        className : 'authView',

        initialize : function(options) {
            check(options).strict().isObject();
            check(options.headerView).strict().isOfType(HeaderView);
            check(options.loginView).strict().isOfType(LoginView);
            check(options.signupView).strict().isOfType(SignupView);

            this.loginView = options.loginView;
            this.signupView = options.signupView;
            this.headerView = options.headerView;

            this.$el.html(_.template(template, {}));
            this.$header = this.$el.find('.header');
            this.$content = this.$el.find('.content');

            this.$header.append(options.headerView.$el);
            this.$content.append(options.loginView.$el);

            options.headerView.setActiveView(HeaderView.VIEW.MYACCOUNT);
            this.displayProfileView();
        },

        displayProfileView : function() {
            // TODO : check if the user is logged in and display profile if so
            this.displayLoginView();
        },

        displayLoginView : function() {
            if (this.currentView !== this.loginView) {
                this.$content.children().detach();
                this.$content.append(this.loginView.$el);
                this.currentView = this.loginView;
            }
        },

        displaySignupView : function() {
            if (this.currentView !== this.signupView) {
                this.$content.children().detach();
                this.$content.append(this.signupView.$el);
                this.currentView = this.signupView;
            }
        },

        remove : function() {
            this.headerView.remove();
            this.loginView.remove();
            this.signupView.remove();
            this.$el.remove();
        }
    }, {
        getInstance : function() {
            _instance = _instance || new AuthView({
                headerView : new HeaderView(),
                loginView : new LoginView(),
                signupView : new SignupView()
            });
            return _instance;
        }
    });

    return AuthView;

});
