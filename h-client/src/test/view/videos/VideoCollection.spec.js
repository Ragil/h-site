define(function(require) {

    require('sinon');
    require('thrift/VideoService_types');
    var check = require('check');
    var videoService = require('videoService');
    var VideoCollection = require('view/videos/VideoCollection');
    var VideoModel = require('view/videos/VideoModel');

    describe('VideoCollection', function() {

        describe('getInstance', function() {

            it('should fetch from server and return an instance', function() {
                // stub out server call
                var spy = sinon.stub(videoService, 'getLatestVideos', function(
                        success, error) {
                    success([]);
                });

                // call instance twice
                var view1 = VideoCollection.getInstance();
                var view2 = VideoCollection.getInstance();

                // verify
                expect(view1).to.be(view2);

                // clean up
                view1.remove();
                spy.restore();
            });

        });

        describe('fetch', function() {

            it('should make an rpc call to getLatestVideos', function() {
                // spy on getLatestVideos
                var spy = sinon.stub(videoService, 'getLatestVideos', function(
                        success, error) {
                    success([]);
                });

                // create a verify no rpc call
                var collection = new VideoCollection();
                expect(spy.callCount).to.be(0);

                // trigger a fetch
                collection.fetch();

                // verify one call with onsuccess and onerror callbacks
                expect(spy.callCount).to.be(1);
                var args = spy.firstCall.args;
                expect(args[0]).to.be.a('function');
                expect(args[1]).to.be.a('function');

                // clean up
                spy.restore();
            });

            it('should populate itself with the server response', function() {

                // spy on getLatestVideos
                var spy = sinon.stub(videoService, 'getLatestVideos', function(
                        success, error) {
                    success([ new YoutubeVideo({
                        id : 'video1',
                        created_ts : 2
                    }), new YoutubeVideo({
                        id : 'video2',
                        created_ts : 1
                    }) ]);
                });

                // trigger a fetch
                var collection = new VideoCollection();
                collection.fetch();

                // verify rpc call
                expect(spy.callCount).to.be(1);

                // verify that there are two models
                expect(collection.length).to.be(2);

                // verify first model
                var model1 = collection.at(0);
                expect(check(model1).isOfType(VideoModel)).to.be(true);
                expect(model1.get('id')).to.be('video1');
                expect(model1.get('created_ts')).to.be(2);

                // verify second model
                var model2 = collection.at(1);
                expect(check(model2).isOfType(VideoModel)).to.be(true);
                expect(model2.get('id')).to.be('video2');
                expect(model2.get('created_ts')).to.be(1);

                // clean up
                spy.restore();
            });

            it('should order models by most recent first', function() {

                // create two models
                var model1 = new VideoModel(new YoutubeVideo({
                    id : 'video1',
                    created_ts : 1
                }));
                var model2 = new VideoModel(new YoutubeVideo({
                    id : 'video2',
                    created_ts : 2
                }));

                // create collection
                var collection = new VideoCollection();

                // add models in incorrect order
                collection.add(model1);
                collection.add(model2);

                // verify correct order by created_ts
                expect(collection.at(0)).to.be(model2);
                expect(collection.at(1)).to.be(model1);

            });

        });

    });

});