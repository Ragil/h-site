define(function(require) {

    var eventBus = require('eventBus');
    var Backbone = require('backbone');

    var MainView = Backbone.View.extend({

        initialize : function() {
            this.$el = $('body').find('.mainView');
            eventBus.on('setLayout', this.setLayout, this);
        },

        setLayout : function(view) {
            this.$el.children().remove();
            this.$el.append(view.$el);
        }

    });

    return MainView;
});
