define(function(require) {

    require('sinon');
    var check = require('check');
    var userService = require('userService');
    var Backbone = require('backbone');
    var SignupView = require('view/auth/signup/SignupView');
    require('thrift/UserService_types');
    require('tErrors');

    describe('SignupView', function() {

        describe('verify', function() {

            it('should require name and nickname', function() {
                // create view and trigger verify
                var view = new SignupView();
                expect(view.verify()).to.be(false);

                // verify that name group is highlighted
                expect(view.$('.nameGroup').hasClass('error')).to.be(true);

                // clean up
                view.remove();
            });

            it('should require email', function() {
                // create view and trigger verify
                var view = new SignupView();
                expect(view.verify()).to.be(false);

                // verify that email group is highlighted
                var $emailGroup = view.$('.emailGroup');
                expect($emailGroup.hasClass('error')).to.be(true);

                // clean up
                view.remove();
            });

            it('should require password', function() {
                // create view and trigger verify
                var view = new SignupView();
                expect(view.verify()).to.be(false);

                // verify that password group is highlighted
                var $passGroup = view.$('.passwordGroup');
                expect($passGroup.hasClass('error')).to.be(true);

                // clean up
                view.remove();
            });

            it('should match password', function() {
                // create view and trigger verify
                var view = new SignupView();

                // put in fake email/name
                view.$('#inputEmail').val('email');
                view.$('#inputName').val('name');
                view.$('#inputNickName').val('nick name');

                // put in unmaching password then trigger verify
                view.$('#inputPassword').val('goodpassword');
                view.$('#verifyPassword').val('badpassword');
                expect(view.verify()).to.be(false);

                // verify that password is highlighted
                var $passGroup = view.$('.passwordGroup');
                expect($passGroup.hasClass('error')).to.be(true);

                // verify error message
                expect(view.$('.errorMessage').text()).to
                        .be('Password does not match');

                // clean up
                view.remove();
            });

            it('should display error message',
                    function() {
                        // create view and trigger verify
                        var view = new SignupView();
                        expect(view.verify()).to.be(false);

                        // verify error message
                        expect(view.$('.errorMessage').text()).to
                                .be('Not enough info');

                        // clean up
                        view.remove();
                    });

            it('should return given all params', function() {
                // create view
                var view = new SignupView();

                // put in fake details and trigger verify
                view.$('#inputEmail').val('email');
                view.$('#inputName').val('name');
                view.$('#inputNickName').val('nick name');
                view.$('#inputPassword').val('goodpassword');
                view.$('#verifyPassword').val('goodpassword');

                expect(view.verify()).to.be(true);

                // verify nothing is highlighted
                var $passGroup = view.$('.passwordGroup');
                var $emailGroup = view.$('.emailGroup');
                var $nameGroup = view.$('.nameGroup');
                expect($passGroup.hasClass('error')).to.be(false);
                expect($nameGroup.hasClass('error')).to.be(false);
                expect($emailGroup.hasClass('error')).to.be(false);

                // verify no error message
                expect(view.$('.errorMessage').text()).to.be('');

                // clean up
                view.remove();
            });

        });

        describe('signup', function() {

            it('should NOT make server call without all params', function() {
                // spy on server call
                var spy = sinon.stub(userService, 'signup');

                // create view and trigger signup
                var view = new SignupView();
                view.$('.signupBtn').click();

                // verify that server was not called
                expect(spy.callCount).to.be(0);

                // clean up
                view.remove();
                spy.restore();
            });

            it('should make server call given all params', function() {
                // spy on server call
                var spy = sinon.stub(userService, 'signup');

                // create view, put in fake values, trigger signup
                var view = new SignupView();
                view.$('#inputEmail').val('email');
                view.$('#inputName').val('name');
                view.$('#inputNickName').val('nick name');
                view.$('#inputPassword').val('goodpassword');
                view.$('#verifyPassword').val('goodpassword');
                view.$('.signupBtn').click();

                // verify server call
                expect(spy.callCount).to.be(1);
                var args = spy.firstCall.args;
                expect(args[0]).to.be('email');
                expect(args[1]).to.be('goodpassword');
                expect(check(args[2]).isOfType(User)).to.be(true);
                expect(args[2].name).to.be('name');
                expect(args[2].nickname).to.be('nick name');

                // clean up
                view.remove();
                spy.restore();
            });

            it('should display error message when signup rejected', function() {
                // spy on server call
                var spy = sinon.stub(userService, 'signup', function(email,
                        pass, user, success, error) {
                    error(new HException({
                        message : 'Email already taken'
                    }));
                });

                // create view, put in fake values, trigger signup
                var view = new SignupView();
                view.$('#inputEmail').val('email');
                view.$('#inputName').val('name');
                view.$('#inputNickName').val('nick name');
                view.$('#inputPassword').val('goodpassword');
                view.$('#verifyPassword').val('goodpassword');
                view.$('.signupBtn').click();

                // verify error message
                expect(view.$('.errorMessage').text()).to
                        .be('Email already taken');

                // clean up
                view.remove();
                spy.restore();
            });

        });

    });

});