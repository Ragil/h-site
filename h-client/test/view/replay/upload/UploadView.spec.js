define(function(require) {

    require('sinon');
    var Backbone = require('backbone');
    var UploadView = require('view/replay/upload/UploadView');

    describe('UploadView', function() {

        describe('constructor', function() {

            it('should display a list of gametypes', function() {
                // create view
                var view = new UploadView();

                // verify all gametypes
                var options = view.$('.gameType').children();
                expect(options.length).to.be(1);
                expect($(options[0]).text()).to.be('1 v 1');
                expect($(options[0]).val()).to.be('1');
            });

        });


    });

});