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
    scrollMov:0,
    mobileY1:0,
    mobileY2:0,
    mobileX1:0,
    mobileX2:0,
    events: {
      'keydown': 'keyPressed',
      'mousewheel': 'wheelMove',
      'touchstart': 'mobilePos1',
      'touchend': 'mobilePos2',
      'click .imagineButton': 'metodologyButton1',
      'click .xButton': 'metodologyButton2',
      'click .yButton': 'metodologyButton3',
      'click .zButton': 'metodologyButton4',
      'click .cultureArrow1': 'culturePrev',
      'click .cultureArrow2': 'cultureNext',
      'click #inputButton': 'sendForm'
    },

    initialize: function (options) {
        _.bindAll(this, 'keyPressed');
        $(document).bind('keydown', this.keyPressed);
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
      this.scrollPos = 1;
      $('.metodologyButton').removeClass('active');
      $('.imagineButton').addClass('active');
      $('#metodologyImg').removeClass();
      $('#metodologyImg').addClass('metodologyImg_1');
    },

    metodologyButton2: function(e){
      this.scrollPos = 2;
      $('.metodologyButton').removeClass('active');
      $('.xButton').addClass('active');
      $('#metodologyImg').removeClass();
      $('#metodologyImg').addClass('metodologyImg_2');
    },

    metodologyButton3: function(e){
      this.scrollPos = 3;
      $('.metodologyButton').removeClass('active');
      $('.yButton').addClass('active');
      $('#metodologyImg').removeClass();
      $('#metodologyImg').addClass('metodologyImg_3');
    },

    metodologyButton4: function(e){
      this.scrollPos = 4;
      $('.metodologyButton').removeClass('active');
      $('.zButton').addClass('active');
      $('#metodologyImg').removeClass();
      $('#metodologyImg').addClass('metodologyImg_4');
    },

    keyPressed: function(e){
      if(e.keyCode===38 && this.scrollPos>0){
        this.scrollPos--;
        this.movePage(this.scrollPos);
      }
      else if(e.keyCode===40 && this.scrollPos<9){
        this.scrollPos++;
        this.movePage(this.scrollPos);
      }
      else if(this.scrollPos===7 && e.keyCode===39){
        this.cultureNext();
      }
      else if(this.scrollPos===7 && e.keyCode===37){
        this.culturePrev();
      }
    },
    wheelMove: function(e){
      if(e.originalEvent.wheelDelta>0 && this.scrollPos>0){
        this.scrollPos--;
        this.movePage(this.scrollPos);
      }
      else if(e.originalEvent.wheelDelta<0 && this.scrollPos<9){
        this.scrollPos++;
        this.movePage(this.scrollPos);
      }
    },

    mobilePos1: function(e){
      this.mobileY1 = e.originalEvent.touches[0].clientY;
      this.mobileX1 = e.originalEvent.touches[0].clientX;
    },

    mobilePos2: function(e){
      this.mobileY2 = e.originalEvent.changedTouches[0].clientY;
      this.mobileX2 = e.originalEvent.changedTouches[0].clientX;
      if(this.mobileX1>(this.mobileX2+50)){
        if(this.scrollPos===2){
          this.scrollPos++;
          this.movePage(this.scrollPos);
        }
        else if(this.scrollPos===3){
          this.scrollPos++;
          this.movePage(this.scrollPos);
        }
        else if(this.scrollPos===1){
          this.scrollPos++;
          this.movePage(this.scrollPos);
        }
        else if(this.scrollPos===7){
          this.cultureNext();
        }
      }
      else if(this.mobileX1<(this.mobileX2-50)){
        if(this.scrollPos===2){
          this.scrollPos--;
          this.movePage(this.scrollPos);
        }
        else if(this.scrollPos===3){
          this.scrollPos--;
          this.movePage(this.scrollPos);
        }
        else if(this.scrollPos===4){
          this.scrollPos--;
          this.movePage(this.scrollPos);
        }
        else if(this.scrollPos===7){
          this.culturePrev();
        }
      }
      else if(this.mobileY1>(this.mobileY2+50)){
        if(this.scrollPos<9){
          this.scrollPos++;
          this.movePage(this.scrollPos);
        }
      }
      else if(this.mobileY1<(this.mobileY2-50)){
        if(this.scrollPos>0){
          this.scrollPos--;
          this.movePage(this.scrollPos);
        }
      }
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

    movePage: function(scrollPos){
      this.scrollPos = scrollPos;
      switch(scrollPos){
        case 0:
          $(window).unbind('scroll');
          $("html, body").animate({ scrollTop: $("#homeDiv").offset().top }, 'slow');
          this.scrollMov = $("#homeDiv").offset().top;
          $(".navbar-nav li").removeClass('navbar-active');
          $(".homeMenu").addClass('navbar-active');
          $(".div2").removeClass('back2');
          break;
        case 1:
          $(window).unbind('scroll');
          $("html, body").animate({ scrollTop: $("#metodologyDiv").offset().top }, 'slow');
          $( ".imagineButton" ).trigger( "click" );
          this.scrollMov = $("#metodologyDiv").offset().top;
          $(".navbar-nav li").removeClass('navbar-active');
          $(".metodologyMenu").addClass('navbar-active');
          $(".div2").removeClass('back2');
          break;
        case 2:
          $(window).unbind('scroll');
          $("html, body").animate({ scrollTop: $("#metodologyDiv").offset().top }, 'slow');
          $( ".xButton" ).trigger( "click" );
          this.scrollMov = $("#metodologyDiv").offset().top;
          $(".navbar-nav li").removeClass('navbar-active');
          $(".metodologyMenu").addClass('navbar-active');
          $(".div2").removeClass('back2');
          break;
        case 3:
          $(window).unbind('scroll');
          $("html, body").animate({ scrollTop: $("#metodologyDiv").offset().top }, 'slow');
          $( ".yButton" ).trigger( "click" );
          this.scrollMov = $("#metodologyDiv").offset().top;
          $(".navbar-nav li").removeClass('navbar-active');
          $(".metodologyMenu").addClass('navbar-active');
          $(".div2").removeClass('back2');
          break;
        case 4:
          $(window).unbind('scroll');
          $("html, body").animate({ scrollTop: $("#metodologyDiv").offset().top }, 'slow');
          $( ".zButton" ).trigger( "click" );
          this.scrollMov = $("#metodologyDiv").offset().top;
          $(".navbar-nav li").removeClass('navbar-active');
          $(".metodologyMenu").addClass('navbar-active');          
          $(".div2").removeClass('back2');
          break;
        case 5:
          $(window).unbind('scroll');
          $("html, body").animate({ scrollTop: $("#proyectsDiv").offset().top }, 'slow');
          this.scrollMov = $("#proyectsDiv").offset().top;
          $(".navbar-nav li").removeClass('navbar-active');
          $(".proyectsMenu").addClass('navbar-active');
          $(".div2").removeClass('back2');
          break;
        case 6:
          $(window).unbind('scroll');
          $("html, body").animate({ scrollTop: $("#hardwarethonDiv").offset().top }, 'slow');
          this.scrollMov = $("#hardwarethonDiv").offset().top;
          $(".navbar-nav li").removeClass('navbar-active');
          $(".hardwarethonMenu").addClass('navbar-active');
          $(".div2").removeClass('back2');
          break;
        case 7:
          $(window).unbind('scroll');
          $("html, body").animate({ scrollTop: $("#cultureDiv").offset().top }, 'slow');
          this.scrollMov = $("#cultureDiv").offset().top;
          $(".navbar-nav li").removeClass('navbar-active');
          $(".cultureMenu").addClass('navbar-active');
          $(".div2").addClass('back2');
          break;
        case 8:
          $(window).unbind('scroll');
          $("html, body").animate({ scrollTop: $("#teamDiv").offset().top }, 'slow');
          this.scrollMov = $("#teamDiv").offset().top;
          $(".navbar-nav li").removeClass('navbar-active');
          $(".teamMenu").addClass('navbar-active');
          $(".div2").addClass('back2');
          break;
        case 9:
          $(window).unbind('scroll');
          $("html, body").animate({ scrollTop: $("#contactDiv").offset().top }, 'slow');
          this.scrollMov = $("#contactDiv").offset().top;
          $(".navbar-nav li").removeClass('navbar-active');
          $(".contactMenu").addClass('navbar-active');
          $(".div2").addClass('back2');
          break;
      }
    },

    addHidden: function(idMsg) {
      $(idMsg).addClass('hidden');
    }
  });

  return HomeView;
});

