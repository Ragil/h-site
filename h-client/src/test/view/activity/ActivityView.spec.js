/**
 * Test for ActivityView
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

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

    });

});