/**
 * The entry point of the application.
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    var $ = require('jquery');
    var Backbone = require('backbone');
    var Router = require('Router');

    $(document).ready(function() {
        new Router();
        Backbone.history.start({
            pushState : true,
            hashChange : false,
            root : '/app/'
        });
    });

});