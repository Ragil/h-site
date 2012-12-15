define(function(require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var check = require('check');
    var Backbone = require('backbone');
    var ReplayCollection = require('view/replay/ReplayCollection');
    var SearchView = require('view/replay/SearchView');
    var ReplayView = require('view/replay/ReplayView');
    var HeaderView = require('view/header/HeaderView');

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

            this.$el.html(_.template(template, {}));
            this.$header = this.$el.find('.header');
            this.$search = this.$el.find('search');
            this.$replays = this.$el.find('.replays');

            this.$header.append(options.headerView.$el.html());
            this.$search.append(options.searchView.$el.html());

            options.model.on('change', this.render, this);
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

        remove : function() {
            this.model.off('change', null, this);
            this.$el.remove();
        }

    }, {
        getInstance : function() {
            if (!_instance) {
                _instance = new ReplaysView({
                    model : ReplayCollection.getInstance(),
                    headerView : HeaderView.getInstance(),
                    searchView : SearchView.getInstance()
                });
            }
            return _instance;
        }
    });

    return ReplaysView;

});