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
    metodologyLeft:false,
    scrollPos:0,
    events: {
      'keydown': 'keyPressed',
      'click .imagineButton': 'metodologyButton1',
      'click .xButton': 'metodologyButton2',
      'click .yButton': 'metodologyButton3',
      'click .zButton': 'metodologyButton4',
      'click #inputButton': 'sendForm'
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
    },

    sendForm: function(e){
      e.preventDefault();
      var url = 'email',
        inputEmail = $('#inputEmail').val(),
        inputName = $('#inputName').val(),
        inputText = $('#inputText').val();
      $.ajax({ 
        url: url,
        type: 'POST',
        data: JSON.stringify({
          'email': inputEmail, 
          'name': inputName,
          'text': inputText
        }),
        beforeSend : function(req) { 
          req.setRequestHeader('content-type', 'application/json'); 
        },
        success: function(res){
          $('#formSuccess').removeClass('hidden');
          $('#inputEmail').val(''),
          $('#inputName').val(''),
          $('#inputText').val('');
          setTimeout(this.addHidden, 2000, '#formSuccess');
        }.bind(this),
        error: function(res){
          setTimeout(this.addHidden, 2000, '#formError');
        }.bind(this)        
      });
    },

    metodologyButton1: function(e){
      this.metodologyCount = 1;
      $('.metodologyButton').removeClass('active');
      $('.imagineButton').addClass('active');
      $('#metodologyImg').removeClass();
      $('#metodologyImg').addClass('metodologyImg_1');
    },

    metodologyButton2: function(e){
      this.metodologyCount = 2;
      $('.metodologyButton').removeClass('active');
      $('.xButton').addClass('active');
      $('#metodologyImg').removeClass();
      $('#metodologyImg').addClass('metodologyImg_2');
    },

    metodologyButton3: function(e){
      this.metodologyCount = 3;
      $('.metodologyButton').removeClass('active');
      $('.yButton').addClass('active');
      $('#metodologyImg').removeClass();
      $('#metodologyImg').addClass('metodologyImg_3');
    },

    metodologyButton4: function(e){
      this.metodologyCount = 4;
      $('.metodologyButton').removeClass('active');
      $('.zButton').addClass('active');
      $('#metodologyImg').removeClass();
      $('#metodologyImg').addClass('metodologyImg_4');
    },

    setPosition: function(num){
      if(num==0){
        this.metodologyCount = 0;
        $('.metodologyButton').removeClass('active');
        $('.imagineButton').addClass('active');
        $('#metodologyImg').removeClass();
        $('#metodologyImg').addClass('metodologyImg_1');
      }
      else{
        this.metodologyCount = 4;
        $('.metodologyButton').removeClass('active');
        $('.zButton').addClass('active');
        $('#metodologyImg').removeClass();
        $('#metodologyImg').addClass('metodologyImg_4');  
      }
    },

    bindScroll: function(that){
      $(window).scroll(that.windowScroll);
      $( "body" ).removeClass( "scrollFreeze" );
    },

    windowScroll: function(e){
      switch(true){
        case ($("#contactDiv").offset().top-50<=e.currentTarget.scrollY):    
          $(".navbar-nav li").removeClass('navbar-active');
          $(".contactMenu").addClass('navbar-active'); 
          break;
        case ($("#teamDiv").offset().top-100<=e.currentTarget.scrollY):    
          $(".navbar-nav li").removeClass('navbar-active');
          $(".teamMenu").addClass('navbar-active'); 
          this.metodologyLeft = false;
          break;
        case ($("#cultureDiv").offset().top-100<=e.currentTarget.scrollY):    
          $(".navbar-nav li").removeClass('navbar-active');
          $(".cultureMenu").addClass('navbar-active'); 
          $(".div2").addClass('back2'); 
          break;
        case ($("#hardwarethonDiv").offset().top-50<=e.currentTarget.scrollY):    
          $(".navbar-nav li").removeClass('navbar-active');
          $(".hardwarethonMenu").addClass('navbar-active');   
          $(".div2").removeClass('back2'); 
          break;
        case ($("#proyectsDiv").offset().top-50<=e.currentTarget.scrollY):    
          $(".navbar-nav li").removeClass('navbar-active');
          $(".proyectsMenu").addClass('navbar-active'); 
          this.metodologyLeft = false;
          break;
        case ($("#metodologyDiv").offset().top-50<=e.currentTarget.scrollY):    
          $(".navbar-nav li").removeClass('navbar-active');
          $(".metodologyMenu").addClass('navbar-active'); 
          this.metodologyLeft = true;
          break;
        case (e.currentTarget.scrollY<$("#metodologyDiv").offset().top-50 ):
          $(".navbar-nav li").removeClass('navbar-active');
          $(".homeMenu").addClass('navbar-active'); 
          break;
      };
      if(this.metodologyLeft){
        if(this.scrollPos-e.currentTarget.scrollY>0){
          switch(this.metodologyCount){
            case 4:    
              $(window).unbind('scroll');
              $("html, body").animate({ scrollTop: $("#metodologyDiv").offset().top-50 }, 'slow');
              $( ".zButton" ).trigger( "click" );
              setTimeout(this.bindScroll, 1000, this);
              this.metodologyCount--; 
              break;
            case 3:    
              $(window).unbind('scroll');
              $("html, body").scrollTop($("#metodologyDiv").offset().top-50);
              $( ".yButton" ).trigger( "click" );
              $( "body" ).addClass( "scrollFreeze" );
              setTimeout(this.bindScroll, 1000, this);
              this.metodologyCount--; 
              break;
            case 2:    
              $(window).unbind('scroll');
              $("html, body").scrollTop($("#metodologyDiv").offset().top-50);
              $( ".xButton" ).trigger( "click" );
              $( "body" ).addClass( "scrollFreeze" );
              setTimeout(this.bindScroll, 1000, this);
              this.metodologyCount--; 
              break;
            case 1:    
              $(window).unbind('scroll');
              $("html, body").scrollTop($("#metodologyDiv").offset().top-50);
              $( ".imagineButton" ).trigger( "click" );
              $( "body" ).addClass( "scrollFreeze" );
              setTimeout(this.bindScroll, 1000, this);
              this.metodologyLeft = false;
              this.metodologyCount--; 
              break;
          };  
        }
        else{
          switch(this.metodologyCount){
            case 0:    
              $(window).unbind('scroll');
              $("html, body").animate({ scrollTop: $("#metodologyDiv").offset().top-50 }, 'slow');
              $( ".imagineButton" ).trigger( "click" );
              $( "body" ).addClass( "scrollFreeze" );
              setTimeout(this.bindScroll, 1000, this);
              break;
            case 1:    
              $(window).unbind('scroll');
              $("html, body").scrollTop($("#metodologyDiv").offset().top-50);
              $( ".xButton" ).trigger( "click" );
              $( "body" ).addClass( "scrollFreeze" );
              setTimeout(this.bindScroll, 1000, this);
              break;
            case 2:    
              $(window).unbind('scroll');
              $("html, body").scrollTop($("#metodologyDiv").offset().top-50);
              $( ".yButton" ).trigger( "click" );
              $( "body" ).addClass( "scrollFreeze" );
              setTimeout(this.bindScroll, 1000, this);
              break;
            case 3:    
              $(window).unbind('scroll');
              $("html, body").scrollTop($("#metodologyDiv").offset().top-50);
              $( ".zButton" ).trigger( "click" );
              $( "body" ).addClass( "scrollFreeze" );
              setTimeout(this.bindScroll, 1000, this);
              break;
          };
        }
      }
      this.scrollPos = e.currentTarget.scrollY;
    },

    addHidden: function(idMsg) {
      $(idMsg).addClass('hidden');
    }
  });

  return HomeView;
});

