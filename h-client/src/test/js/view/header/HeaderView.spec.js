/**
 * Test for HeaderView.js
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    var HeaderView = require('view/header/HeaderView');

    describe('HeaderView', function() {

        describe('getInstance', function() {

            it('should return an instance', function() {
                var view1 = HeaderView.getInstance();
                var view2 = HeaderView.getInstance();

                expect(view1).to.be(view2);

                view1.remove();
            });

        });

    });

});