define(function(require) {

    var _ = require('underscore');
    var check = require('check');
    var Backbone = require('backbone');
    var userService = require('userService');
    var template = require('text!view/auth/login/LoginView.html');

    var LoginView = Backbone.View.extend({
        tagName : 'div',
        className : 'loginView',

        events : {
            'click .signInBtn' : 'signIn'
        },

        initialize : function(options) {
            check(options).isObject();

            this.$el.html(_.template(template, {}));

            this.$emailGroup = this.$('.emailGroup');
            this.$inputEmail = this.$('#inputEmail');
            this.$passwordGroup = this.$('.passwordGroup');
            this.$inputPassword = this.$('#inputPassword');
            this.$errorMessage = this.$('.errorMessage');
        },

        signIn : function(event) {
            event.preventDefault();
            this.clearErrorMessage();

            var email = this.$inputEmail.val();
            var pass = this.$inputPassword.val();

            // highlight empty but required fields
            this.$emailGroup.toggleClass('error', !email || email === '');
            this.$passwordGroup.toggleClass('error', !pass || pass === '');

            // verify that all information is provided
            var valid = _.reduce([ email, pass ], function(memo, val) {
                return memo && val && val !== '';
            }, true);

            if (valid) {
                // make a service call
                userService.login(email, pass, _.bind(this.displayProfile, this),
                        _.bind(this.invalidLogin, this));
            } else {
                this.notEnoughInfo();
            }
        },

        displayProfile : function() {

        },

        notEnoughInfo : function() {
            this.$errorMessage.text('Email and password are required');
        },

        invalidLogin : function(tException) {
            this.$errorMessage.text('Invalid login information');
        },

        clearErrorMessage : function() {
            this.$errorMessage.text('');
        },

        remove : function() {
            this.$el.remove();
        }
    });

    return LoginView;

});