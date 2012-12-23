/**
 * Test for AuthView.js
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    require('sinon');
    var check = require('check');
    var AuthView = require('view/auth/AuthView');
    var HeaderView = require('view/header/HeaderView');
    var LoginView = require('view/auth/login/LoginView');
    var SignupView = require('view/auth/signup/SignupView');
    var eventBus = require('eventBus');
    var events = require('events');

    describe('AuthView', function() {

        var loginView = null;
        var signupView = null;
        var headerView = null;

        beforeEach(function() {
            loginView = new LoginView();
            signupView = new SignupView();
            headerView = new HeaderView();
        });

        afterEach(function() {
            loginView.remove();
            signupView.remove();
            headerView.remove();
        });

        describe('constructor', function() {

            it('should throw exception without headerView', function() {
                expect(function() {
                    new AuthView({
                        headerView : null
                    });
                }).to.throwException();
            });

            it('should throw exception without loginView', function() {
                expect(function() {
                    new AuthView({
                        loginView : null
                    });
                }).to.throwException();
            });

            it('should throw exception without signupView', function() {
                expect(function() {
                    new AuthView({
                        signupView : null
                    });
                }).to.throwException();
            });

            it('should inject sub-views given all params', function() {
                var view = null;

                // verify
                expect(function() {
                    view = new AuthView({
                        headerView : headerView,
                        loginView : loginView,
                        signupView : signupView
                    });
                }).not.to.throwException();

                expect(view.$('.header').children().html()).to
                        .be(headerView.$el.html());
                expect(view.$('.content').children().html()).to
                        .be(loginView.$el.html());

                // clean up
                view.remove();
            });

            it('should setActiveView to MYACCOUNT', function() {
                var view = null;

                // listen to headerView setActive
                var spy = sinon.stub(headerView, 'setActiveView');

                // verify
                expect(function() {
                    view = new AuthView({
                        headerView : headerView,
                        loginView : loginView,
                        signupView : signupView
                    });
                }).not.to.throwException();

                // verify that active view is set
                expect(spy.callCount).to.be(1);
                expect(spy.firstCall.args[0]).to.be(HeaderView.VIEW.MYACCOUNT);

                // clean up
                spy.restore();
                view.remove();
            });

        });

        describe('getInstance', function() {

            it('should return an instance', function() {
                // request two instance
                var view1 = AuthView.getInstance();
                var view2 = AuthView.getInstance();

                // verify they are the same instance
                expect(view1).to.be(view2);

                // clean up
                view1.remove();
                view2.remove();
            });

        });

        describe('eventBus(events.AuthView.showSignup)', function() {

            it('should set the content to signupView', function() {
                // create view
                var view = new AuthView({
                    headerView : headerView,
                    signupView : signupView,
                    loginView : loginView
                });

                // tigger event
                eventBus.trigger(events.AuthView.showSignup);

                // verify the current view
                expect(view.currentView).to.be(signupView);
                expect(view.$('.content').children().html()).to
                        .be(signupView.$el.html());

                // clean up
                view.remove();
            });

        });

        describe('eventBus(events.AuthView.showLogin)', function() {

            it('should set the content to loginView', function() {
                // create view
                var view = new AuthView({
                    headerView : headerView,
                    signupView : signupView,
                    loginView : loginView
                });

                // tigger event
                eventBus.trigger(events.AuthView.showSignup);
                eventBus.trigger(events.AuthView.showLogin);

                // verify the current view
                expect(view.currentView).to.be(loginView);
                expect(view.$('.content').children().html()).to
                        .be(loginView.$el.html());

                // clean up
                view.remove();
            });

        });

    });

});