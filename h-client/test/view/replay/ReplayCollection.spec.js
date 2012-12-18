define(function(require) {

    require('sinon');
    var replayService = require('replayService');
    var ReplayCollection = require('view/replay/ReplayCollection');
    var ReplayModel = require('view/replay/ReplayModel');

    describe('ReplayCollection', function() {

        describe('getInstance', function() {

            it('should create an instance', function() {
                // spy on server call
                var spy = sinon.stub(replayService, 'getReplays', function(
                        success, error) {
                    success([]);
                });

                // request for two collections
                var collection1 = ReplayCollection.getInstance();
                var collection2 = ReplayCollection.getInstance();

                // verify
                expect(spy.callCount).to.be(1);
                expect(collection1).to.be(collection2);

                // clean up
                spy.restore();
            });

        });

        describe('fetch', function() {

            it('should construct two models from server response', function() {
                // spy on server call
                var spy = sinon.stub(replayService, 'getReplays', function(
                        success, error) {
                    success([ new Replay({
                        id : 'replay1',
                        created_ts : 2
                    }), new Replay({
                        id : 'replay2',
                        created_ts : 1
                    }) ]);
                });

                // create collection and trigger fetch
                var collection = new ReplayCollection();
                collection.fetch();

                // verify server call
                expect(spy.callCount).to.be(1);

                // verify the first model
                var model1 = collection.at(0);
                expect(model1.get('id')).to.be('replay1');
                expect(model1.get('created_ts')).to.be(2);

                // verify the second model
                var model2 = collection.at(1);
                expect(model2.get('id')).to.be('replay2');
                expect(model2.get('created_ts')).to.be(1);

                // clean up
                spy.restore();
            });

        });

        describe('comparator', function() {

            it('should order model in desc order of created_ts', function() {

                // create two models
                var model1 = new ReplayModel(new Replay({
                    id : 'replay1',
                    created_ts : 1
                }));
                var model2 = new ReplayModel(new Replay({
                    id : 'replay2',
                    created_ts : 2
                }));

                // create collection
                var collection = new ReplayCollection();

                // add models in wrong order
                collection.add(model1);
                collection.add(model2);

                // verify the correct order
                expect(collection.at(0)).to.be(model2);
                expect(collection.at(1)).to.be(model1);
            });

        });

    });

});