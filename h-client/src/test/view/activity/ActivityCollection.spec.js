define(function(require) {

    require('sinon');
    var activityService = require('activityService');
    var ActivityCollection = require('view/activity/ActivityCollection');
    var ActivityModel = require('view/activity/ActivityModel');

    describe('ActivityCollection', function() {

        describe('getInstance', function() {

            it('should fetch from server and return an instance', function() {
                // mock out rpc call to server
                var spy = sinon.stub(activityService, 'getLatestActivities');

                // request for two instances
                var collection1 = ActivityCollection.getInstance();
                var collection2 = ActivityCollection.getInstance();

                // verify they are both the same collection
                expect(collection1).to.be(collection2);
                expect(spy.callCount).to.be(1);

                // clean up
                spy.restore();
            });

        });

        describe('fetch', function() {

            it('should make an rpc call to getLatestActivities', function() {
                // spy on server call
                var spy = sinon.stub(activityService, 'getLatestActivities',
                        function(success, error) {
                            success([]);
                        });

                // create then fetch
                var collection = new ActivityCollection();
                collection.fetch();

                // verify server call parameters
                expect(spy.callCount).to.be(1);
                expect(spy.firstCall.args[0]).to.be.a('function');
                expect(spy.firstCall.args[1]).to.be.a('function');

                // clean up
                spy.restore();
            });

            it('should convert response to ActivityModel', function() {
                // spy on server call
                var spy = sinon.stub(activityService, 'getLatestActivities',
                        function(success, error) {
                            // return a fake response with two activities
                            success([ {
                                id : 'activity1',
                                created_ts : 2,
                                title : 'title1',
                                description : 'desc1'
                            }, {
                                id : 'activity2',
                                created_ts : 1,
                                title : 'title2',
                                description : 'desc2'
                            } ]);
                        });
                expect(spy.callCount).to.be(0);

                // create then fetch
                var collection = new ActivityCollection();
                collection.fetch();

                // verify server call parameters
                expect(spy.callCount).to.be(1);

                // verify there are two models
                expect(collection.length).to.be(2);

                // verify first ActivityModel
                var firstActivity = collection.at(0);
                expect(firstActivity.get('id')).to.be('activity1');
                expect(firstActivity.get('created_ts')).to.be(2);
                expect(firstActivity.get('title')).to.be('title1');
                expect(firstActivity.get('description')).to.be('desc1');

                // verify second ActivityModel
                var secondActivity = collection.at(1);
                expect(secondActivity.get('id')).to.be('activity2');
                expect(secondActivity.get('created_ts')).to.be(1);
                expect(secondActivity.get('title')).to.be('title2');
                expect(secondActivity.get('description')).to.be('desc2');

                // clean up
                spy.restore();
            });

        });

        describe('comparator', function() {

            it('should order by latest activity first', function() {
                // create two activities
                var firstActivity = new ActivityModel({
                    id : 'activity1',
                    created_ts : 1
                });
                var secondActivity = new ActivityModel({
                    id : 'activity2',
                    created_ts : 2
                });

                // create the collection
                var collection = new ActivityCollection();

                // add the models in order of creation
                collection.add(firstActivity);
                collection.add(secondActivity);

                // verify the correct order
                var first = collection.at(0);
                expect(first).to.be(secondActivity);

                // verify the older activity
                var second = collection.at(1);
                expect(second).to.be(firstActivity);
            });

        });

    });

});