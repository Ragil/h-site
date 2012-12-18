/**
 * The header view of the application.
 * 
 * @author Ragil Prasetya - praser05@gmail.com
 */
define(function(require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var template = require('text!view/header/HeaderView.html');
    var _instance = null;

    var HeaderView = Backbone.View.extend({
        className : 'headerView',

        events : {
            'click .homeBtn' : 'redirectToHome',
            'click .replayBtn' : 'redirectToReplay'
        },

        initialize : function(options) {
            var $el = this.$el;
            $el.html(_.template(template, {}));

            var $btns = [];
            $btns.push(this.$homeBtn = $el.find('.homeBtn').parent());
            $btns.push(this.$replayBtn = $el.find('.replayBtn').parent());

            this.$btns = $btns;
        },

        remove : function() {
            this.$el.remove();
        },

        redirectToHome : function(event) {
            event.preventDefault();
            Backbone.history.navigate('home', {
                trigger : true
            });
        },

        redirectToReplay : function(event) {
            event.preventDefault();
            Backbone.history.navigate('replay', {
                trigger : true
            });
        },

        /*
         * Deactivates all current buttons and activates the given btn
         */
        setBtnActive : function($activeBtn) {
            _.each(this.$btns, function($btn, index) {
                $btn.removeClass('active');
            });
            $activeBtn.addClass('active');
        },

        setActiveView : function(view) {
            switch (view) {
            case HeaderView.VIEW.REPLAY:
                this.setBtnActive(this.$replayBtn);
                break;
            case HeaderView.VIEW.HOME:
                this.setBtnActive(this.$homeBtn);
                break;
            }
        }

    }, {
        getInstance : function() {
            _instance = _instance || new HeaderView();
            return _instance;
        },

        VIEW : {
            HOME : 'home',
            REPLAY : 'replay'
        }
    });

    return HeaderView;
});