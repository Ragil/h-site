define(function(require) {

    require('sinon');
    var userService = require('userService');
    var LoginView = require('view/auth/login/LoginView');

    describe('Login', function() {

        describe('constructor', function() {

            it('should create an instance', function() {
                var view = new LoginView();
                expect(view).to.be.ok();
                view.remove();
            });

        });

        describe('signIn', function() {

            it('should highlight the email/pass if not given', function() {
                // spy on server call
                var spy = sinon.stub(userService, 'login');

                // create view and trigger a sigin
                var view = new LoginView();
                view.$('.signInBtn').click();

                // verify that the email + password input group is highlighted
                expect(view.$('.emailGroup').hasClass('error')).to.be(true);
                expect(view.$('.passwordGroup').hasClass('error')).to.be(true);

                // verify that error message is provided
                expect(view.$('.errorMessage').text()).to
                        .be('Email and password are required');

                // verify that the server is not contacted
                expect(spy.callCount).to.be(0);

                // clean up
                view.remove();
                spy.restore();
            });

            it('should make a server call to login',
                    function() {
                        // spy on server call
                        var spy = sinon.stub(userService, 'login');

                        // create view
                        var view = new LoginView();

                        // add fake email/pass and trigger signin
                        view.$('#inputEmail').val('email');
                        view.$('#inputPassword').val('password');
                        view.$('.signInBtn').click();

                        // verify that email/pass are NOT highlighted
                        expect(view.$('.passwordGroup').hasClass('error')).to
                                .be(false);
                        expect(view.$('.emailGroup').hasClass('error')).to
                                .be(false);

                        // verify server call
                        expect(spy.callCount).to.be(1);
                        var args = spy.firstCall.args;
                        expect(args[0]).to.be('email');
                        expect(args[1]).to.be('password');
                        expect(args[2]).to.be.a('function');
                        expect(args[3]).to.be.a('function');

                        // clean up
                        spy.restore();
                        view.remove();
                    });

            describe('invalid login', function() {

                it('should show invalid login to the user', function() {
                    // spy on server call
                    var spy = sinon.stub(userService, 'login', function(email,
                            pass, success, error) {
                        // reject request
                        error();
                    });

                    // create view and trigger a sigin
                    var view = new LoginView();

                    // add fake email/pass and trigger signin
                    view.$('#inputEmail').val('email');
                    view.$('#inputPassword').val('password');
                    view.$('.signInBtn').click();

                    // verify error message
                    expect(view.$('.errorMessage').text()).to
                            .be('Invalid login information');

                    // verify server call
                    expect(spy.callCount).to.be(1);

                    // clean up
                    spy.restore();
                    view.remove();
                });

            });

        });

    });

});