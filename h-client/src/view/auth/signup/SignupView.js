define(function(require) {

    var _ = require('underscore');
    var eventBus = require('eventBus');
    var check = require('check');
    var Backbone = require('backbone');
    var userService = require('userService');
    var events = require('events');
    var template = require('text!view/auth/signup/SignupView.html');
    require('thrift/UserService_types');

    var SignupView = Backbone.View.extend({
        tagName : 'div',
        className : 'signupView',

        events : {
            'click .signupBtn' : 'signup',
            'click .loginBtn' : 'displayLoginView'
        },

        initialize : function(options) {
            check(options).isObject();

            this.$el.html(_.template(template), {});

            this.$emailGroup = this.$('.emailGroup');
            this.$passwordGroup = this.$('.passwordGroup');
            this.$nameGroup = this.$('.nameGroup');
            this.$inputEmail = this.$('#inputEmail');
            this.$inputPassword = this.$('#inputPassword');
            this.$verifyPassword = this.$('#verifyPassword');
            this.$inputName = this.$('#inputName');
            this.$inputNickName = this.$('#inputNickName');
            this.$errorMessage = this.$('.errorMessage');
        },

        signup : function(event) {
            if (this.verify()) {
                userService.signup(this.$inputEmail.val(), this.$inputPassword
                        .val(), new User({
                    name : this.$inputName.val(),
                    nickname : this.$inputNickName.val()
                }), _.bind(this.displayCheckEmail, this), _.bind(function(
                        tException) {
                    // display server error message
                    this.$errorMessage.text(tException.message);
                }, this));
            }
        },

        displayCheckEmail : function() {
        // TODO : display check verify email
        },

        displayLoginView : function(event) {
            eventBus.trigger(events.AuthView.showLogin);
        },

        // Returns true iff all required user information are provided. Mark any
        // missing input with an error decorator
        verify : function() {
            // reset error messages
            this.$errorMessage.text('');
            this.$passwordGroup.toggleClass('error', false);
            this.$nameGroup.toggleClass('error', false);
            this.$emailGroup.toggleClass('error', false);

            var name = this.$inputName.val();
            var nickName = this.$inputNickName.val();
            var pass = this.$inputPassword.val();
            var verifyPass = this.$verifyPassword.val();
            var email = this.$inputEmail.val();

            // helper to verify params
            var hasField = function(value, $container) {
                if (!value || value === '') {
                    $container.toggleClass('error', true);
                    return false;
                }
                return true;
            };

            var valid = hasField(name, this.$nameGroup);
            valid = hasField(nickName, this.$nameGroup) && valid;
            valid = hasField(pass, this.$passwordGroup) && valid;
            valid = hasField(verifyPass, this.$passwordGroup) && valid;
            valid = hasField(email, this.$emailGroup) && valid;

            if (!valid) {
                this.$errorMessage.text('Not enough info');
            }

            // verify passwords match
            if (pass !== verifyPass) {
                this.$passwordGroup.toggleClass('error', true);
                this.$errorMessage.text('Password does not match');
                valid = false;
            }

            return valid;
        },

        remove : function() {
            this.$el.remove();
        }
    });

    return SignupView;

});