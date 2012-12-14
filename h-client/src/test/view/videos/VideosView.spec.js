define(function(require) {

    require('thrift/VideoService_types');
    require('sinon');
    var VideosView = require('view/videos/VideosView');
    var VideoView = require('view/videos/VideoView');
    var VideoModel = require('view/videos/VideoModel');
    var VideoCollection = require('view/videos/VideoCollection');

    describe('VideosView', function() {

        describe('constructor', function() {

            it('should throw exception without VideoCollection', function() {
                // verify
                expect(function() {
                    new VideosView({
                        model : undefined
                    });
                }).to.throwException();
            });

        });

        describe('getInstance', function() {

            it('should return an instance', function() {
                var view1 = VideosView.getInstance();
                var view2 = VideosView.getInstance();

                expect(view1).to.equal(view2);

                view1.remove();
            });

        });

        describe('render', function() {

            it('should generate one VideoView per VideoModel', function() {

                // create 2 VideoModels
                var video1 = new VideoModel(new YoutubeVideo({
                    id : 'video1',
                    created_ts : 2
                }));
                var video2 = new VideoModel(new YoutubeVideo({
                    id : 'video2',
                    created_ts : 1
                }));

                // create a collection consisting of two videos
                var collection = new VideoCollection();
                collection.add(video1);
                collection.add(video2);

                // create video views based on models
                var videoView1 = new VideoView({
                    model : video1
                });
                var videoView2 = new VideoView({
                    model : video2
                });

                // create collection view
                var videosView = new VideosView({
                    model : collection
                });

                // verify both items in the carousel
                var items = videosView.$('.items').children();
                expect(items.length).to.be(2);
                expect($(items[0]).html()).to.be(videoView1.$el.html());
                expect($(items[1]).html()).to.be(videoView2.$el.html());

                // clean up
                videoView1.remove();
                videoView2.remove();
                videosView.remove();
            });

            it('should make the first view active', function() {
                // create collection
                var collection = new VideoCollection();
                collection.add(new VideoModel(new YoutubeVideo({
                    id : 'video1',
                    created_ts : 2
                })));
                collection.add(new VideoModel(new YoutubeVideo({
                    id : 'video2',
                    created_ts : 1
                })));

                // create view
                var videosView = new VideosView({
                    model : collection
                });

                // verify that the first item is active
                var $firstItem = videosView.$('.items').children().first();
                expect($firstItem.hasClass('active')).to.be(true);
            });

            it('should NOT make the second view active', function() {
                // create collection
                var collection = new VideoCollection();
                collection.add(new VideoModel(new YoutubeVideo({
                    id : 'video1',
                    created_ts : 2
                })));
                collection.add(new VideoModel(new YoutubeVideo({
                    id : 'video2',
                    created_ts : 1
                })));

                // create view
                var videosView = new VideosView({
                    model : collection
                });

                // verify that the second item is not active
                var $secondItem = $(videosView.$('.items').children()[1]);
                expect($secondItem.hasClass('active')).to.be(false);
            });

        });

    });

});