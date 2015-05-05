define([
  'jquery',
  'underscore',
  'backbone', 
  'text!../templates/menu.html'
], function ($, _, Backbone, menu_template) {
  'use strict';
  var MenuView = Backbone.View.extend({
    el: '#navbar-main',
    menu_template: _.template(menu_template),
    events: {
      'click ul': 'hideMenu'
    },

    initialize: function (options) {
        // ---------------------------------
        // Add the options as part of the instance
        //_.extend(this, options);
    },

    render: function() {
      this.$el.html('').hide().fadeIn().slideDown('slow');
      this.$el.append(this.menu_template());
    },

    hideMenu: function(){
      $('.navbar-collapse').removeClass('in');
    }
  });

  return MenuView;
});

