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
            '' : 'index',
            'home' : 'home',
            'replay' : 'replay'
        },

        index : function() {
            Backbone.history.navigate('home', {
                trigger : true
            });
        },

        home : function() {
            // create home view
            this.mainView.setLayout(HomeView.getInstance());
        },

        replay : function() {
            this.mainView.setLayout(ReplayView.getInstance());
        }

    });

    return Router;

});