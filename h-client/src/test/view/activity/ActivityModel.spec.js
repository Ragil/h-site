define(function(require) {

    require('sinon');
    var activityService = require('activityService');
    var ActivityModel = require('view/activity/ActivityModel');

    describe('ActivityModel', function() {

        describe('fetch', function() {

            it('should make an rpc call to getActivity with an id', function() {
                // stub on rpc call
                var spy = sinon.stub(activityService, 'getActivity', function(
                        id, success, error) {
                    success({
                        id : id,
                        created_ts : 1
                    });
                });

                // create model and trigger fetch
                var model = new ActivityModel({
                    id : 'activity1'
                });
                model.fetch();

                // verify server call
                expect(spy.callCount).to.be(1);

                // verify rpc params
                var args = spy.firstCall.args;
                expect(args[0]).to.be('activity1');
                expect(args[1]).to.be.a('function');
                expect(args[2]).to.be.a('function');

                // clean up
                spy.restore();
            });

        });

    });

});