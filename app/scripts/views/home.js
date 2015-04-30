define([
  'jquery',
  'underscore',
  'backbone', 
  'polyglot',
  'text!../templates/home.html'
], function ($, _, Backbone, Polyglot, home_template) {
  'use strict';
  var HomeView = Backbone.View.extend({
    el: '.content',
    home_template: _.template(home_template),
    events: {
      'keydown': 'keyPressed'
    },

    initialize: function (options) {
        // ---------------------------------
        // Add the options as part of the instance
        //_.extend(this, options);
        _.bindAll(this, 'windowScroll');
        // bind to window
        $(window).scroll(this.windowScroll);
    },

    render: function() { 
      var pol = new Polyglot({
        "hello": "Hello",
        "bye": "Goodbye"
      });
      $('#bodyContainer').removeClass();
      $('#bodyContainer').addClass('bodyHome');
      $('.circleBase').removeClass('here');
      $('.menubar').removeClass('menuLeft');
      this.$el.html('').hide().fadeIn().slideDown('slow');
      this.$el.append(this.home_template());
    },

    keyPressed: function(e) {
      console.log(e);
      /*if(e.keyCode == 13 && this.modalUp == false){
        this.loginFunct();
      } 
      else if(e.keyCode == 39 && this.manualPage < 7){
        this.manualPage ++;        
        var now = '.help-button.' + this.manualPage.toString();
        $(now).click();
      }
      else if(e.keyCode == 37 && this.manualPage > 1){
        this.manualPage --;      
        var now = '.help-button.' + this.manualPage.toString();
        $(now).click();
      } */
    },

    windowScroll: function(e){
      switch(true){
        case (e.currentTarget.scrollY<$("#contactDiv").offset().top-100 ):
          console.log('Home');
          $(".navbar-nav li").removeClass('navbar-active');
          $(".homeMenu").addClass('navbar-active'); 
          break;
        case ($("#contactDiv").offset().top-100<e.currentTarget.scrollY): 
          console.log('Im moving');        
          $(".navbar-nav li").removeClass('navbar-active');
          $(".contactMenu").addClass('navbar-active'); 
          break;
      }
      /*if($("#contactDiv").offset().top-100<e.currentTarget.scrollY){
        console.log('Im moving');
        $(".navbar-nav li").removeClass('navbar-active');
        $(".contactMenu").addClass('navbar-active');  
      }*/
    }
  });

  return HomeView;
});

