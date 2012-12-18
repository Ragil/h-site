define(function(require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var check = require('check');
    var Backbone = require('backbone');
    var ReplayCollection = require('view/replay/ReplayCollection');
    var SearchView = require('view/replay/search/SearchView');
    var UploadView = require('view/replay/upload/UploadView');
    var ReplayView = require('view/replay/ReplayView');
    var HeaderView = require('view/header/HeaderView');
    require('bootstrap');

    var template = require('text!view/replay/ReplaysView.html');

    var _instance = null;

    var ReplaysView = Backbone.View.extend({
        model : ReplayCollection,
        tagName : 'div',
        className : 'replaysView',

        initialize : function(options) {
            check(options).strict().isObject();
            check(options.model).strict().isOfType(ReplayCollection);
            check(options.headerView).strict().isOfType(HeaderView);
            check(options.searchView).strict().isOfType(SearchView);
            check(options.uploadView).strict().isOfType(UploadView);

            this.options = options;
            this.$el.html(_.template(template, {}));
            this.$header = this.$el.find('.header');
            this.$search = this.$el.find('.search');
            this.$uploadBtn = this.$el.find('.uploadBtn');
            this.$uploadForm = this.$el.find('.uploadCollapse');
            this.$replays = this.$el.find('.replays');

            this.$header.append(options.headerView.$el);
            this.$search.append(options.searchView.$el);
            this.$uploadForm.append(options.uploadView.$el);

            options.model.on('change', this.render, this);
            options.headerView.setActiveView(HeaderView.VIEW.REPLAY);

            // setup uploadBtn behaviour
            this.$uploadBtn.collapse({
                toggle : false
            });
            this.$uploadForm.on('show', _.bind(this.onCollapseShown, this));
            this.$uploadForm.on('hide', _.bind(this.onCollapseHidden, this));
            this.collapseShowing = false;

            this.render();
        },

        render : function() {
            var $replays = this.$replays;

            // clean up previous replays
            $replays.empty();

            // Generate a replay view for each replay in the collection
            this.model.forEach(function(replay) {
                var replayView = new ReplayView({
                    model : replay
                });
                $replays.append(replayView.$el);
            });

        },

        showUploadView : function() {
            if (!this.collapseShowing) {
                this.$uploadForm.collapse('show');
            }
        },

        hideUploadView : function() {
            if (this.collapseShowing) {
                this.$uploadForm.collapse('hide');
            }
        },

        onCollapseShown : function() {
            // silently replace to the upload url so when users refresh the
            // page, they can see the upload view
            Backbone.history.navigate('replay/upload', {
                trigger : false,
                replace : true
            });
            this.collapseShowing = true;
        },

        onCollapseHidden : function() {
            // silently replace back to the replay url so when users refresh the
            // page, they don't see the upload view
            Backbone.history.navigate('replay', {
                trigger : false,
                replace : true
            });
            this.collapseShowing = false;
        },

        remove : function() {
            this.model.off('change', null, this);
            this.options.headerView.remove();
            this.$el.remove();
        }

    }, {
        getInstance : function() {
            if (!_instance) {
                _instance = new ReplaysView({
                    // Don't return an instance of header view because it's
                    // shared with replaysview which causes a bug when switching
                    // between views.
                    model : ReplayCollection.getInstance(),
                    headerView : new HeaderView(),
                    searchView : SearchView.getInstance(),
                    uploadView : UploadView.getInstance()
                });
            }
            return _instance;
        }
    });

    return ReplaysView;

});