/**
 * Test for ReplayView
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    require('sinon');
    require('thrift/ReplayService_types');
    var ReplayModel = require('view/replay/ReplayModel');
    var ReplayView = require('view/replay/ReplayView');

    describe('ReplayView', function() {

        describe('constructor', function() {

            it('should throw exception without model', function() {
                expect(function() {
                    new ReplayView({
                        model : null
                    });
                }).to.throwException();
            });

            it('should initialize the template with the model', function() {
                // create the model
                var model = new ReplayModel(new Replay({
                    id : 'replay1',
                    title : 'WhiteRa vs Husky',
                    description : "Husky does a high templar rush "
                            + "against WhiteRa's probes.",
                    uploader : new User({
                        id : 'user1',
                        name : 'WhiteRa'
                    }),
                    gameType : GameType.ONE_V_ONE
                }));

                // create view for the model
                var view = new ReplayView({
                    model : model
                });

                // verify the template
                var columns = view.$el.children();
                expect($(columns[0]).text()).to.be('WhiteRa vs Husky');
                expect($(columns[1]).text()).to
                        .be("Husky does a high templar rush"
                                + " against WhiteRa's probes.");
                expect($(columns[2]).text()).to.be('WhiteRa');
                expect($(columns[3]).text()).to.be('' + GameType.ONE_V_ONE);

                // clean up
                view.remove();
            });

        });

    });

});