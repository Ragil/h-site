/**
 * Test for HomeView.js
 * 
 * @author Ragil Prasetya - praser05@gmail.coms
 */
define(function(require) {

    var HomeView = require('view/home/HomeView');
    var HeaderView = require('view/header/HeaderView');
    var VideosView = require('view/videos/VideosView');
    var ActivitiesView = require('view/activity/ActivitiesView');

    describe('HomeView', function() {

        describe('constructor', function() {

            it('should throw exception without HeaderView', function() {
                var videosView = VideosView.getInstance();
                var activitiesView = ActivitiesView.getInstance();

                // verify
                expect(function() {
                    new HomeView({
                        headerView : undefined,
                        videosView : videosView,
                        activitiesView : activitiesView
                    });
                }).to.throwError();

                // clean up
                videosView.remove();
                activitiesView.remove();
            });

            it('should throw exception without VideosView', function() {
                var headerView = HeaderView.getInstance();
                var activitiesView = ActivitiesView.getInstance();

                // verify
                expect(function() {
                    new HomeView({
                        headerView : headerView,
                        videosView : undefined,
                        activitiesView : activitiesView
                    });
                }).to.throwError();

                // clean up
                headerView.remove();
                activitiesView.remove();
            });

            it('should throw exception without ActivitiesView', function() {
                var headerView = HeaderView.getInstance();
                var videosView = VideosView.getInstance();

                // verify
                expect(function() {
                    new HomeView({
                        headerView : headerView,
                        videosView : videosView,
                        activitiesView : undefined
                    });
                }).to.throwError();

                // clean up
                headerView.remove();
                videosView.remove();
            });

            it('should create a new HomeView given required views', function() {
                var videosView = VideosView.getInstance();
                var headerView = HeaderView.getInstance();
                var activitiesView = ActivitiesView.getInstance();

                // create view
                var homeView = new HomeView({
                    headerView : headerView,
                    videosView : videosView,
                    activitiesView : activitiesView
                });

                // verify contents
                expect(homeView.$('.header').children().html()).to
                        .be(headerView.$el.html());
                expect(homeView.$('.videos').children().html()).to
                        .be(videosView.$el.html());
                expect(homeView.$('.activities').children().html()).to
                        .be(activitiesView.$el.html());

                // clean up
                headerView.remove();
                videosView.remove();
                activitiesView.remove();
                homeView.remove();
            });

            it('should set the active view as VIEW.HOME', function() {
                var videosView = VideosView.getInstance();
                var headerView = HeaderView.getInstance();
                var activitiesView = ActivitiesView.getInstance();

                // spy on setActiveView
                var spy = sinon.stub(headerView, 'setActiveView');

                var homeView = new HomeView({
                    headerView : headerView,
                    videosView : videosView,
                    activitiesView : activitiesView
                });

                // verify that the active view is changed
                expect(spy.callCount).to.be(1);
                expect(spy.firstCall.args[0]).to.be(HeaderView.VIEW.HOME);

                // clean up
                spy.restore();
                headerView.remove();
                videosView.remove();
                activitiesView.remove();
                homeView.remove();
            });

        });

        describe('getInstance', function() {

            it('should return an instance', function() {
                var view1 = HomeView.getInstance();
                var view2 = HomeView.getInstance();

                // verify
                expect(view1).to.be(view2);

                // clean up
                view1.remove();
            });

        });

    });

});
