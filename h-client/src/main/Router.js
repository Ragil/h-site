/**
 * This routing table for the application.
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    var HomeView = require('view/home/HomeView');
    var MainView = require('view/MainView');
    var Backbone = require('backbone');

    var Router = Backbone.Router.extend({

        initialize : function() {
            this.mainView = new MainView();
        },

        routes : {
            '' : 'home' // all
        },

        home : function() {
            // create home view
            this.mainView.setLayout(HomeView.getInstance());
        }

    });

    return Router;

});