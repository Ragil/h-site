/**
 * Test for VideoView.js
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    var VideoView = require('view/videos/VideoView');
    var VideoModel = require('view/videos/VideoModel');

    describe('VideoView', function() {

        it('should be a bootstrap carousel item', function() {

            // create the model
            var model = new VideoModel({
                id : 'videoId'
            });

            // create the view
            var view = new VideoView({
                model : model
            });

            // verify that it is a bootstrap carousel item
            expect(view.className).to.be('item');
            expect(view.tagName).to.be('div');
        });

        describe('constructor', function() {

            it('should change the src to the videoid', function() {
                // create the model
                var model = new VideoModel({
                    id : 'videoId'
                });

                // create the view
                var view = new VideoView({
                    model : model
                });

                // verify the src of the youtube iframe
                var $el = view.$el.find('iframe').first();
                expect($el.attr('src')).to
                        .be('https://www.youtube.com/embed/videoId');
            });

        });

    });

});