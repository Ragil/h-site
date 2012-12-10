/**
 * Test for ActivitesView.
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    require('sinon');
    var activityService = require('activityService');
    var ActivityCollection = require('view/activity/ActivityCollection');
    var ActivitiesView = require('view/activity/ActivitiesView');

    describe('ActivitiesView', function() {

        describe('constructor', function() {

            it('should throw exception when no collection', function() {
                expect(function() {
                    new ActivitiesView({
                        model : undefined
                    });
                }).to.throwException();
            });

            it('should create an instance given a collection', function() {
                new ActivitiesView({
                    model : new ActivityCollection()
                });
            });

        });

        describe('getInstance', function() {

            it('should create an instance from an '
                    + 'ActivityCollection instance ', function() {
                // mock out collection
                var spy = sinon.stub(ActivityCollection, 'getInstance');
                spy.returns(new ActivityCollection());

                // request for two views
                var view1 = ActivitiesView.getInstance();
                var view2 = ActivitiesView.getInstance();

                // verify they are the same instance
                expect(view1).to.be(view2);

                // verify that only one server call is made
                expect(spy.callCount).to.be(1);

                // clean up
                spy.restore();
                view1.remove();
                view2.remove();
            });

        });

    });

});