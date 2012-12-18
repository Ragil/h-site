/**
 * Test for ActivityView
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    require('thrift/ActivityService_types');
    var ActivityModel = require('view/activity/ActivityModel');
    var ActivityView = require('view/activity/ActivityView');

    describe('ActivityView', function() {

        describe('constructor', function() {

            it('should throw exception when model is not provided', function() {
                expect(function() {
                    new ActivityView({
                        model : undefined
                    });
                }).to.throwException();
            });

            it('should create an instance given a model', function() {
                new ActivityView({
                    model : new ActivityModel()
                });
            });

        });

        describe('render', function() {

            describe('new video uploaded', function() {

                it('should render Husky Cast', function() {
                    // create model that video uploaded
                    var model = new ActivityModel(new Activity({
                        type : ActivityType.NEW_VIDEO,
                        description : 'WhiteRa mothership rushed Husky'
                    }));

                    // create view
                    var view = new ActivityView({
                        model : model
                    });

                    // verify type and description
                    expect(view.$el.find('.type').text()).to.be('Husky Cast');
                    expect(view.$el.find('.description').text()).to
                            .be('WhiteRa mothership rushed Husky');

                    // clean up
                    view.remove();
                });

                it('should highlight the row green', function() {
                    // create model that video uploaded
                    var model = new ActivityModel(new Activity({
                        type : ActivityType.NEW_VIDEO
                    }));

                    // create view
                    var view = new ActivityView({
                        model : model
                    });

                    // verify green highlighting
                    expect(view.$el.hasClass('success')).to.be(true);
                    expect(view.$el.hasClass('info')).to.be(false);
                    expect(view.$el.hasClass('warning')).to.be(false);
                    expect(view.$el.hasClass('error')).to.be(false);
                });

            });

            describe('new user joined', function() {

                it('should render Friend Joined', function() {
                    // create model of a new user joining
                    var model = new ActivityModel(new Activity({
                        type : ActivityType.NEW_USER,
                        description : 'Say Hi to Kurthugoschneider!'
                    }));

                    // create view
                    var view = new ActivityView({
                        model : model
                    });

                    // verify type and description
                    expect(view.$el.find('.type').text()).to
                            .be('Friend Joined');
                    expect(view.$el.find('.description').text()).to
                            .be('Say Hi to Kurthugoschneider!');

                    // clean up
                    view.remove();

                });

                it('should highlight the row blue', function() {
                    // create model of a new user joining
                    var model = new ActivityModel(new Activity({
                        type : ActivityType.NEW_USER
                    }));

                    // create view
                    var view = new ActivityView({
                        model : model
                    });

                    // verify green highlighting
                    expect(view.$el.hasClass('success')).to.be(false);
                    expect(view.$el.hasClass('info')).to.be(true);
                    expect(view.$el.hasClass('warning')).to.be(false);
                    expect(view.$el.hasClass('error')).to.be(false);
                });

            });

            describe('new replay uploaded', function() {

                it('should render Sick Replay', function() {
                    // create model of a new replay upload
                    var model = new ActivityModel(new Activity({
                        type : ActivityType.NEW_REPLAY,
                        description : 'Check out this replay and tell '
                                + 'us if you want it casted'
                    }));

                    // create view
                    var view = new ActivityView({
                        model : model
                    });

                    // verify type and description
                    expect(view.$el.find('.type').text()).to.be('Cool Replay');
                    expect(view.$el.find('.description').text()).to
                            .be('Check out this replay and tell us if '
                                    + 'you want it casted');

                    // clean up
                    view.remove();
                });

                it('should not highlight the row', function() {
                    // create model of a new replay upload
                    var model = new ActivityModel(new Activity({
                        type : ActivityType.NEW_REPLAY
                    }));

                    // create view
                    var view = new ActivityView({
                        model : model
                    });

                    // verify green highlighting
                    expect(view.$el.hasClass('success')).to.be(false);
                    expect(view.$el.hasClass('info')).to.be(false);
                    expect(view.$el.hasClass('warning')).to.be(false);
                    expect(view.$el.hasClass('error')).to.be(false);
                });

            });

            describe('new post', function() {

                it('should render Chatting', function() {
                    // create model of a new replay upload
                    var model = new ActivityModel(new Activity({
                        type : ActivityType.NEW_POST,
                        description : 'Blah blah blah blah'
                    }));

                    // create view
                    var view = new ActivityView({
                        model : model
                    });

                    // verify type and description
                    expect(view.$el.find('.type').text()).to.be('Chatting');
                    expect(view.$el.find('.description').text()).to
                            .be('Blah blah blah blah');

                    // clean up
                    view.remove();
                });

                it('should not highlight the row', function() {
                    // create model of a new replay upload
                    var model = new ActivityModel(new Activity({
                        type : ActivityType.NEW_POST
                    }));

                    // create view
                    var view = new ActivityView({
                        model : model
                    });

                    // verify green highlighting
                    expect(view.$el.hasClass('success')).to.be(false);
                    expect(view.$el.hasClass('info')).to.be(false);
                    expect(view.$el.hasClass('warning')).to.be(false);
                    expect(view.$el.hasClass('error')).to.be(false);
                });

            });
        });

    });

});