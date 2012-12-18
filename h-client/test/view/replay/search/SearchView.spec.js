/**
 * Test for SearchView
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    require('sinon');
    var replayService = require('replayService');
    var ReplayCollection = require('view/replay/ReplayCollection');
    var SearchView = require('view/replay/search/SearchView');

    describe('SearchView', function() {

        describe('constructor', function() {

            it('should throw exception without ReplayCollection', function() {
                expect(function() {
                    new SearchView({
                        model : null
                    });
                }).to.throwException();
            });

            it('should create a view given all params', function() {
                var view = null;

                // verify
                expect(function() {
                    view = new SearchView({
                        model : new ReplayCollection()
                    });
                }).not.to.throwException();

                // clean up
                view.remove();
            });

        });

        describe('getInstance', function() {

            it('should return an instance', function() {
                // spy on server call
                var spy = sinon.stub(replayService, 'getReplays', function(
                        success, error) {
                    success([]);
                });

                // request for two instances
                var view1 = SearchView.getInstance();
                var view2 = SearchView.getInstance();

                // verify they are the same object
                expect(view1).to.be(view2);

                // clean up
                spy.restore();
            });

        });

    });

});