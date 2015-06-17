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
    cultureCount:101,
    scrollPos:0,
    events: {
      'click .cultureArrow1': 'culturePrev',
      'click .cultureArrow2': 'cultureNext',
      'click #inputButton': 'sendForm'
    },

    initialize: function (options) {
        _.bindAll(this, 'windowScroll');
        // bind to window
        $(window).scroll(this.windowScroll);
    },

    render: function() {
      this.$el.html('').hide().fadeIn().slideDown('slow');
      this.$el.append(this.home_template());
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


    culturePrev: function(){
        this.cultureCount--;
        var cultureClass = 'cultureImg_' + (Math.abs(this.cultureCount%10));
        $('#cultureImg').removeClass();
        $('#cultureImg').addClass(cultureClass);
        $('#cultureName').html(_.template(cultureText));
    },

    cultureNext: function(){
        this.cultureCount++;
        var cultureClass = 'cultureImg_' + (Math.abs(this.cultureCount%10));
        $('#cultureImg').removeClass();
        $('#cultureImg').addClass(cultureClass);
        $('#cultureName').html(_.template(cultureText));
    },


    bindScroll: function(that){
      $(window).scroll(that.windowScroll);
    },

    movePage: function(scrollPos){
      this.scrollPos = scrollPos;
      switch(scrollPos){
        case 0:
          $("html, body").animate({ scrollTop: $("#homeDiv").offset().top }, 'slow');
          this.scrollMov = $("#homeDiv").offset().top;
          $(".navbar-nav li").removeClass('navbar-active');
          $(".homeMenu").addClass('navbar-active');
          break;
        case 1:
          $("html, body").animate({ scrollTop: $("#metodologyDiv").offset().top }, 'slow');
          this.scrollMov = $("#metodologyDiv").offset().top;
          $(".navbar-nav li").removeClass('navbar-active');
          $(".metodologyMenu").addClass('navbar-active');
          break;
        case 2:
          $("html, body").animate({ scrollTop: $("#proyectsDiv").offset().top }, 'slow');
          this.scrollMov = $("#proyectsDiv").offset().top;
          $(".navbar-nav li").removeClass('navbar-active');
          $(".proyectsMenu").addClass('navbar-active');
          break;
        case 3:
          $("html, body").animate({ scrollTop: $("#hardwarethonDiv").offset().top }, 'slow');
          this.scrollMov = $("#hardwarethonDiv").offset().top;
          $(".navbar-nav li").removeClass('navbar-active');
          $(".hardwarethonMenu").addClass('navbar-active');
          break;
        case 4:
          $("html, body").animate({ scrollTop: $("#teamDiv").offset().top }, 'slow');
          this.scrollMov = $("#teamDiv").offset().top;
          $(".navbar-nav li").removeClass('navbar-active');
          $(".teamMenu").addClass('navbar-active');
          break;
        case 5:
          $("html, body").animate({ scrollTop: $("#contactDiv").offset().top }, 'slow');
          this.scrollMov = $("#contactDiv").offset().top;
          $(".navbar-nav li").removeClass('navbar-active');
          break;
      }
    },

    windowScroll: function(e){
      if(e.currentTarget.scrollY<=$("#teamDiv").offset().top-50){
        $(".div2").removeClass('back2');
        $("#world").removeClass('hidden');
      }
      else{
        $(".div2").addClass('back2');
        $("#world").addClass('hidden');
        //window['myVar'] = true;
      }
    },

    addHidden: function(idMsg) {
      $(idMsg).addClass('hidden');
    }
  });

  return HomeView;
});

