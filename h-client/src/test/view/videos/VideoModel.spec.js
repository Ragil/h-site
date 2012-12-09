/**
 * Test for VideoModel
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    require('sinon');
    var videoService = require('videoService');
    var VideoModel = require('view/videos/VideoModel');

    describe('VideoModel', function() {

        describe('fetch', function() {

            it('should make an rpc call to getVideo with an id', function() {
                // create a fake model
                var model = new VideoModel({
                    id : 'videoID'
                });

                // stub out rpc call
                var spy = sinon.stub(videoService, 'getVideo', function(id,
                        success, error) {
                    expect(id).to.be('videoID');
                    expect(success).to.be.a('function');
                    expect(error).to.be.a('function');

                    // return a fake model
                    success({
                        id : 'videoID',
                        created_ts : 2
                    });
                });

                // trigger
                model.fetch();

                // verify
                expect(spy.callCount).to.be(1);

                // clean up
                spy.reset();
            });

        });

    });

});