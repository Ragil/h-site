/**
 * Test for AppView.js
 * 
 * @author Ragil Prasetya - praser05@gmail.coms
 */
define(function(require) {

    var AppView = require('view/app/AppView');
    var HeaderView = require('view/header/HeaderView');
    var VideosView = require('view/videos/VideosView');

    describe('AppView', function() {

        describe('constructor', function() {

            it('should throw exception without HeaderView', function() {
                var videosView = VideosView.getInstance();

                // verify
                expect(function() {
                    new AppView({
                        headerView : undefined,
                        videosView : videosView
                    });
                }).to.throwError();

                // clean up
                videosView.remove();
            });

            it('should throw exception without VideosView', function() {
                var headerView = HeaderView.getInstance();

                // verify
                expect(function() {
                    new AppView({
                        headerView : headerView,
                        videosView : undefined
                    });
                }).to.throwError();

                // clean up
                headerView.remove();
            });

            it('should create a new AppView given required views', function() {
                var videosView = VideosView.getInstance();
                var headerView = HeaderView.getInstance();

                // create view
                var appView = new AppView({
                    headerView : headerView,
                    videosView : videosView
                });

                // verify contents
                expect(appView.$('.header').children().html()).to
                        .be(headerView.$el.html());
                expect(appView.$('.videos').children().html()).to
                        .be(videosView.$el.html());

                // clean up
                headerView.remove();
                videosView.remove();
                appView.remove();
            });

        });

        describe('getInstance', function() {

            it('should return an instance', function() {
                var view1 = AppView.getInstance();
                var view2 = AppView.getInstance();

                // verify
                expect(view1).to.be(view2);

                // clean up
                view1.remove();
            });

        });

    });

});