/**
 * Test for AppView.js
 * 
 * @author Ragil Prasetya - praser05@gmail.coms
 */
define(function(require) {

    var AppView = require('view/app/AppView');

    describe('AppView', function() {

        describe('getInstance', function() {

            it('should return an instance', function() {
                var view1 = AppView.getInstance();
                var view2 = AppView.getInstance();

                expect(view1).to.be(view2);

                view1.remove();
            });

        });

    });

});
