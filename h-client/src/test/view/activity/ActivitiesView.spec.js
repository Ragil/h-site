/**
 * Test for ActivitesView.
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    var $ = require('jquery');
    require('sinon');
    var activityService = require('activityService');
    var ActivityCollection = require('view/activity/ActivityCollection');
    var ActivityModel = require('view/activity/ActivityModel');
    var ActivitiesView = require('view/activity/ActivitiesView');
    var ActivityView = require('view/activity/ActivityView');

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

        describe('render', function() {

            it('should create an ActivityView for each model', function() {

                // create two models
                var activity1 = new ActivityModel({
                    type : 1,
                    description : 'video uploaded',
                    created_ts : 2
                });
                var activity2 = new ActivityModel({
                    type : 2,
                    description : 'new user',
                    created_ts : 1
                });

                // create expected views
                var view1 = new ActivityView({
                    model : activity1
                });
                var view2 = new ActivityView({
                    model : activity2
                });

                // create collection
                var collection = new ActivityCollection();
                collection.add(activity1);
                collection.add(activity2);

                // create collections view
                var collectionView = new ActivitiesView({
                    model : collection
                });

                // verify that two views and generated
                var views = collectionView.$('.activities').children();
                expect($(views[0]).html()).to.be(view1.$el.html());
                expect($(views[1]).html()).to.be(view2.$el.html());

                // clean up
                view1.remove();
                view2.remove();
                collectionView.remove();
            });

            it('should be attached to model change event', function() {

                // create an empty collection
                var collection = new ActivityCollection();

                // create a collections view
                var collectionView = new ActivitiesView({
                    model : collection
                });

                // verify that no views are generated
                expect(collectionView.$('.activities').children().length).to
                        .be(0);

                // add model to the collection
                collection.add(new ActivityModel({
                    type : 2,
                    description : 'new user',
                    created_ts : 1
                }));

                // verify that one view is added
                expect(collectionView.$('.activities').children().length).to
                        .be(1);

                // clean up
                collectionView.remove();
            });

        });

    });

});