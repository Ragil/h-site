/**
 * Test for AuthView.js
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    require('sinon');
    var AuthView = require('view/auth/AuthView');
    var HeaderView = require('view/header/HeaderView');
    var LoginView = require('view/auth/login/LoginView');

    describe('AuthView', function() {

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

            it('should inject sub-views given all params', function() {
                var view = null;
                var headerView = HeaderView.getInstance();
                var loginView = new LoginView();

                // verify
                expect(function() {
                    view = new AuthView({
                        headerView : headerView,
                        loginView : loginView
                    });
                }).not.to.throwException();

                expect(view.$('.header').children().html()).to
                        .be(headerView.$el.html());
                expect(view.$('.content').children().html()).to
                        .be(loginView.$el.html());

                // clean up
                headerView.remove();
                loginView.remove();
                view.remove();
            });

            it('should setActiveView to MYACCOUNT', function() {
                var view = null;
                var headerView = HeaderView.getInstance();
                var loginView = new LoginView();

                // listen to headerView setActive
                var spy = sinon.stub(headerView, 'setActiveView');

                // verify
                expect(function() {
                    view = new AuthView({
                        headerView : headerView,
                        loginView : loginView
                    });
                }).not.to.throwException();

                // verify that active view is set
                expect(spy.callCount).to.be(1);
                expect(spy.firstCall.args[0]).to.be(HeaderView.VIEW.MYACCOUNT);

                // clean up
                spy.restore();
                headerView.remove();
                loginView.remove();
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

    });

});