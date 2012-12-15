/**
 * Test for ReplaysView
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    require('sinon');
    var replayService = require('replayService');
    var HeaderView = require('view/header/HeaderView');
    var ReplaysView = require('view/replay/ReplaysView');
    var SearchView = require('view/replay/SearchView');
    var ReplayCollection = require('view/replay/ReplayCollection');
    var ReplayModel = require('view/replay/ReplayModel');
    var ReplayView = require('view/replay/ReplayView');

    describe('ReplaysView', function() {

        describe('getInstance', function() {

            it('should return an instance', function() {
                // mock out server call
                var spy = sinon.stub(replayService, 'getReplays', function(
                        success, error) {
                    success([]);
                });

                // request for two instance
                var view1 = ReplaysView.getInstance();
                var view2 = ReplaysView.getInstance();

                // verify they are the same view
                expect(view1).to.be(view2);

                // clean up
                spy.restore();
            });

        });

        describe('constructor', function() {

            it('should throw exception without model', function() {
                var headerView = HeaderView.getInstance();
                var searchView = SearchView.getInstance();

                // verify
                expect(function() {
                    new ReplaysView({
                        model : null,
                        headerView : headerView,
                        searchView : searchView
                    });
                }).to.throwException();

                // clean up
                searchView.remove();
                headerView.remove();
            });

            it('should throw exception without headerView', function() {
                var searchView = SearchView.getInstance();

                // verify
                expect(function() {
                    new ReplaysView({
                        model : new ReplayCollection(),
                        headerView : null,
                        searchView : searchView
                    });
                }).to.throwException();

                // clean up
                searchView.remove();
            });

            it('should throw exception without searchView', function() {
                var headerView = HeaderView.getInstance();

                // verify
                expect(function() {
                    view = new ReplaysView({
                        model : new ReplayCollection(),
                        headerView : headerView,
                        searchView : null
                    });
                }).to.throwException();

                // clean up
                headerView.remove();
            });

            it('should create an instance given all params', function() {
                var headerView = HeaderView.getInstance();
                var searchView = SearchView.getInstance();
                var view = null;

                // verify
                expect(function() {
                    view = new ReplaysView({
                        model : new ReplayCollection(),
                        headerView : headerView,
                        searchView : searchView
                    });
                }).not.to.throwException();

                // clean up
                searchView.remove();
                headerView.remove();
                view.remove();
            });

            it('should replace container with sub-views', function() {
                // create subviews
                var headerView = HeaderView.getInstance();
                var searchView = SearchView.getInstance();

                // create view
                var view = new ReplaysView({
                    model : new ReplayCollection(),
                    headerView : headerView,
                    searchView : searchView
                });

                // verify contents
                expect(view.$('.header').html()).to.be(headerView.$el.html());
                expect(view.$('.search').html()).to.be(searchView.$el.html());

                // clean up
                headerView.remove();
                searchView.remove();
                view.remove();
            });

        });

        describe('render', function() {

            it('should generate a row for each model', function() {

                // create two models
                var model1 = new ReplayModel(new Replay({
                    id : 'replay1',
                    title : 'title1',
                    description : 'description1',
                    uploader : new User({
                        id : 'user1',
                        name : 'name1'
                    }),
                    gameType : GameType.ONE_V_ONE
                }));
                var model2 = new ReplayModel(new Replay({
                    id : 'replay2',
                    title : 'title2',
                    description : 'description2',
                    uploader : new User({
                        id : 'user2',
                        name : 'name2'
                    }),
                    gameType : GameType.ONE_V_ONE
                }));

                // create expected views for each model
                var view1 = new ReplayView({
                    model : model1
                });
                var view2 = new ReplayView({
                    model : model2
                });

                // create a collection and add both models
                var collection = new ReplayCollection();
                collection.add(model1);
                collection.add(model2);

                // create collection view
                var view = new ReplaysView({
                    model : collection,
                    headerView : HeaderView.getInstance(),
                    searchView : SearchView.getInstance()
                });

                // verify that two row entries are created
                var replays = view.$el.find('.replays').children();
                expect(replays.length).to.be(2);

                // verify the contents of each row
                expect($(replays[0]).html()).to.be(view1.$el.html());
                expect($(replays[1]).html()).to.be(view2.$el.html());

                // clean up
                view1.remove();
                view2.remove();
                HeaderView.getInstance().remove();
                SearchView.getInstance().remove();
                view.remove();
            });

        });

    });

});