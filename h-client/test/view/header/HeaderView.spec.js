/**
 * Test for HeaderView.js
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    require('sinon');
    var HeaderView = require('view/header/HeaderView');
    var Backbone = require('backbone');

    describe('HeaderView', function() {

        describe('getInstance', function() {

            it('should return an instance', function() {
                var view1 = HeaderView.getInstance();
                var view2 = HeaderView.getInstance();

                expect(view1).to.be(view2);

                view1.remove();
            });

        });

        describe('redirectToHome', function() {

            it('should redirect to "home"', function() {
                // create a view
                var view = new HeaderView();

                // start then spyon backbone history
                var spy = sinon.stub(Backbone.history, 'navigate',
                        function() {});

                // trigger a click on home view
                view.$('.homeBtn').click();

                // verify navigation
                expect(spy.callCount).to.be(1);
                var args = spy.firstCall.args;
                expect(args[0]).to.be('home');
                expect(args[1].trigger).to.be(true);

                // clean up
                spy.restore();
                view.remove();
            });

        });

        describe('redirectToReplay', function() {

            it('should redirect to replay', function() {
                // create a view
                var view = new HeaderView();

                // start then spyon backbone history
                var spy = sinon.stub(Backbone.history, 'navigate',
                        function() {});

                // trigger a click on home view
                view.$('.replayBtn').click();

                // verify navigation
                expect(spy.callCount).to.be(1);
                var args = spy.firstCall.args;
                expect(args[0]).to.be('replay');
                expect(args[1].trigger).to.be(true);

                // clean up
                spy.restore();
                view.remove();
            });

        });

        describe('setActiveView', function() {

            describe('VIEW.REPLAY', function() {

                it('should set replayBtn active', function() {
                    // create a view
                    var view = new HeaderView();

                    // set REPLAY as active view
                    view.setActiveView(HeaderView.VIEW.REPLAY);

                    // verify that replay link is active
                    expect(view.$('.replayBtn').parent().hasClass('active')).to
                            .be(true);

                    // clean up
                    view.remove();
                });

            });

            describe('VIEW.HOME', function() {

                it('should set homeBtn active', function() {
                    // create a view
                    var view = new HeaderView();

                    // set REPLAY as active view
                    view.setActiveView(HeaderView.VIEW.HOME);

                    // verify that replay link is active
                    expect(view.$('.homeBtn').parent().hasClass('active')).to
                            .be(true);

                    // clean up
                    view.remove();
                });

            });

            describe('VIEW.MYACCOUNT', function() {

                it('should set myaccountBtn active', function() {
                    // create a view
                    var view = new HeaderView();

                    // set REPLAY as active view
                    view.setActiveView(HeaderView.VIEW.MYACCOUNT);

                    // verify that replay link is active
                    expect(view.$('.myaccountBtn').parent().hasClass(
                            'active')).to.be(true);

                    // clean up
                    view.remove();
                });

            });
            
        });

    });

});