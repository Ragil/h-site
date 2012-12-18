/**
 * Test for ReplayModel.js
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    require('sinon');
    require('thrift/ReplayService_types');
    require('thrift/UserService_types');
    var ReplayModel = require('view/replay/ReplayModel');
    var replayService = require('replayService');

    describe('ReplayModel', function() {

        describe('fetch', function() {

            it('should make server call getReplay with an id', function() {

                // spy on server call
                var spy = sinon.stub(replayService, 'getReplay', function(id,
                        success, error) {
                    success(new Replay({
                        id : 'replay1',
                        created_ts : 1,
                        title : 'title',
                        description : 'description',
                        uploader : new User({
                            id : 'user1',
                            name : 'name1'
                        }),
                        gameType : GameType.ONE_V_ONE
                    }));
                });

                // create model and trigger fetch
                var model = new ReplayModel(new Replay({
                    id : 'replay1'
                }));
                model.fetch();

                // verify server call and arguments
                expect(spy.callCount).to.be(1);
                var args = spy.firstCall.args;
                expect(args[0]).to.be('replay1');
                expect(args[1]).to.be.a('function');
                expect(args[1]).to.be.a('function');

                // verify model
                expect(model.get('id')).to.be('replay1');
                expect(model.get('created_ts')).to.be(1);
                expect(model.get('title')).to.be('title');
                expect(model.get('description')).to.be('description');
                expect(model.get('uploader').id).to.be('user1');
                expect(model.get('uploader').name).to.be('name1');
                expect(model.get('gameType')).to.be(GameType.ONE_V_ONE);

                // clean up
                spy.restore();
            });

        });

    });

});