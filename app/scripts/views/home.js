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
    metodologyCount:0,
    scrollPos:0,
    events: {
      'keydown': 'keyPressed',
      'click .imagineButton': 'metodologyButton1',
      'click .xButton': 'metodologyButton2',
      'click .yButton': 'metodologyButton3',
      'click .zButton': 'metodologyButton4'
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
      this.$el.html('').hide().fadeIn().slideDown('slow');
      this.$el.append(this.home_template());
      $('.metodologyButton').removeClass('active');
      $('.imagineButton').addClass('active');
      $("#metodologyDiv").scrollLeft=2500;
    },

    metodologyButton1: function(e){
      $('.metodologyButton').removeClass('active');
      $('.imagineButton').addClass('active');
      $('#metodologyImg').removeClass();
      $('#metodologyImg').addClass('metodologyImg_1');
    },

    metodologyButton2: function(e){
      $('.metodologyButton').removeClass('active');
      $('.xButton').addClass('active');
      $('#metodologyImg').removeClass();
      $('#metodologyImg').addClass('metodologyImg_2');
    },

    metodologyButton3: function(e){
      $('.metodologyButton').removeClass('active');
      $('.yButton').addClass('active');
      $('#metodologyImg').removeClass();
      $('#metodologyImg').addClass('metodologyImg_3');
    },

    metodologyButton4: function(e){
      $('.metodologyButton').removeClass('active');
      $('.zButton').addClass('active');
      $('#metodologyImg').removeClass();
      $('#metodologyImg').addClass('metodologyImg_4');
    },

    ke: function(e) {
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
      console.log(this.scrollPos-e.currentTarget.scrollY);
      switch(true){
        case (e.currentTarget.scrollY<$("#metodologyDiv").offset().top-100 ):
          //console.log('Home');
          $(".navbar-nav li").removeClass('navbar-active');
          $(".homeMenu").addClass('navbar-active'); 
          break;
        case (($("#metodologyDiv").offset().top-100<e.currentTarget.scrollY)&&(this.metodologyCount==0)):
          if(this.scrollPos-e.currentTarget.scrollY<0){
            $("html, body").scrollTop($("#metodologyDiv").offset().top-100);
            $( ".imagineButton" ).trigger( "click" );
            this.metodologyCount++; 
          }
          break;
        case (($("#metodologyDiv").offset().top-100<e.currentTarget.scrollY)&&(this.metodologyCount==1)):
          if(this.scrollPos-e.currentTarget.scrollY<0){
            $("html, body").scrollTop($("#metodologyDiv").offset().top-100);
            $( ".xButton" ).trigger( "click" );
            this.metodologyCount++; 
          }
          else{
            $("html, body").scrollTop($("#metodologyDiv").offset().top-100);
            $( ".imagineButton" ).trigger( "click" );
            this.metodologyCount--; 
          }
          break;
        case (($("#metodologyDiv").offset().top-100<e.currentTarget.scrollY)&&(this.metodologyCount==2)):
          if(this.scrollPos-e.currentTarget.scrollY<0){
            $("html, body").scrollTop($("#metodologyDiv").offset().top-100);
            $( ".yButton" ).trigger( "click" );
            this.metodologyCount++; 
          }
          else{
            $("html, body").scrollTop($("#metodologyDiv").offset().top-100);
            $( ".xButton" ).trigger( "click" );
            this.metodologyCount--; 
          }
          break;
        case (($("#metodologyDiv").offset().top-100<e.currentTarget.scrollY)&&(this.metodologyCount==3)):
          if(this.scrollPos-e.currentTarget.scrollY<0){
            $("html, body").scrollTop($("#metodologyDiv").offset().top-100);
            $( ".zButton" ).trigger( "click" );
            this.metodologyCount++; 
          }
          else{
            $("html, body").scrollTop($("#metodologyDiv").offset().top-100);
            $( ".yButton" ).trigger( "click" );
            this.metodologyCount--; 
          }
          break;
        case (($("#metodologyDiv").offset().top-100<e.currentTarget.scrollY)&&(this.metodologyCount==4)):
          console.log('postmeto');
          break;
        case ($("#contactDiv").offset().top-100<e.currentTarget.scrollY): 
          console.log('Im moving');        
          $(".navbar-nav li").removeClass('navbar-active');
          $(".contactMenu").addClass('navbar-active'); 
          break;
      }
      this.scrollPos = e.currentTarget.scrollY;
    }
  });

  return HomeView;
});

