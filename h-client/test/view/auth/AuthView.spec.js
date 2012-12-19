/**
 * Test for AuthView.js
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    require('sinon');
    var AuthView = require('view/auth/AuthView');
    var HeaderView = require('view/header/HeaderView');

    describe('AuthView', function() {

        describe('constructor', function() {

            it('should throw exception without headerView', function() {
                expect(function() {
                    new AuthView({
                        headerView : null
                    });
                }).to.throwException();
            });

            it('should create a view given all params', function() {
                var view = null;
                var headerView = HeaderView.getInstance();

                // verify
                expect(function() {
                    view = new AuthView({
                        headerView : headerView
                    });
                }).not.to.throwException();

                // clean up
                headerView.remove();
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