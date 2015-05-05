/*global define*/
define([
  'jquery',
  'backbone', 
  'polyglot',
  'views/home',
  'views/contact',
  'views/menu',
  'text!../../assets/locales/es.json',
  'text!../../assets/locales/en.json'
], function ($, Backbone, Polyglot, homeView, contactView, menuView, localEs, localEn) {
  'use strict';

  var HomeView = new homeView(),
    ContactView = new contactView(),
    MenuView = new menuView(),
    Router = Backbone.Router.extend({
      routes: {
          'en': 'en',
          'es': 'es',
          '': 'reRoute',
          '*path':  'reRoute'
      },
      objectLocal : {},
      menuRender : false,

      initialize: function() {
        this.objectLocal = {
          'es': localEs,
          'en': localEn
        };
        var locale = localStorage.getItem('locale') || 'es',
          localArray = this.objectLocal[locale].split("'");
        window.polyglot = new Polyglot();
        for(var i=0; i<=localArray.length-2; i++){
          var x = localArray[i+1].toString(),
              y = localArray[i+3],
              phrase = {};
            phrase[x] = y;
          window.polyglot.extend(phrase);
          i=i+3;
        };
        MenuView.render();
        HomeView.render();
      },

      en: function() {
        localStorage.setItem('locale', 'en');
        var localArray = this.objectLocal['en'].split("'");
        window.polyglot = new Polyglot();
        for(var i=0; i<=localArray.length-2; i++){
          var x = localArray[i+1].toString(),
              y = localArray[i+3],
              phrase = {};
            phrase[x] = y;
          window.polyglot.extend(phrase);
          i=i+3;
        };
        MenuView.render();
        HomeView.render();
        if(window.history.length>2){
          window.history.back();
        }
      },

      es: function() {
        localStorage.setItem('locale', 'es');
        var localArray = this.objectLocal['es'].split("'");
        window.polyglot = new Polyglot();
        for(var i=0; i<=localArray.length-2; i++){
          var x = localArray[i+1].toString(),
              y = localArray[i+3],
              phrase = {};
            phrase[x] = y;
          window.polyglot.extend(phrase);
          i=i+3;
        };
        MenuView.render();
        HomeView.render();
        if(window.history.length>2){
          window.history.back();
        }
      },

      reRoute: function(){
        switch(window.location.hash){
          case '#home':
            setTimeout(this.home, 100, this);
            break;
          case '#metodology':
            setTimeout(this.metodology, 100, this);
            break;
          case '#proyects':
            setTimeout(this.proyects, 100, this);
            break;
          case '#hardwarethon':
            setTimeout(this.hardwarethon, 100, this);
            break;
          case '#culture':
            setTimeout(this.culture, 100, this);
            break;
          case '#team':
            setTimeout(this.team, 100, this);
            break;
          case '#contact':
            setTimeout(this.contact, 100, this);
            break;
          default:
            setTimeout(this.home, 100, this);
            break;
        }
      },

      home: function(that) {
          HomeView.setPosition(0);
          $(window).unbind('scroll');
          $("html, body").animate({ scrollTop: $("#homeDiv").offset().top-50 }, 'slow');
          setTimeout(that.bindScroll, 1000);
          $(".navbar-nav li").removeClass('navbar-active');
          $(".homeMenu").addClass('navbar-active'); 
          $(".div2").removeClass('back2'); 
      },
      
      metodology: function(that) {
          HomeView.setPosition(0);
          $(window).unbind('scroll');
          $("html, body").animate({ scrollTop: $("#metodologyDiv").offset().top-50 }, 'slow');
          setTimeout(that.bindScroll, 1000);
          $(".navbar-nav li").removeClass('navbar-active');
          $(".metodologyMenu").addClass('navbar-active'); 
          $(".div2").removeClass('back2'); 
      },
      
      proyects: function(that) {
          HomeView.setPosition(1);
          $(window).unbind('scroll');
          $("html, body").animate({ scrollTop: $("#proyectsDiv").offset().top-50 }, 'slow');
          setTimeout(that.bindScroll, 1000);
          $(".navbar-nav li").removeClass('navbar-active');
          $(".proyectsMenu").addClass('navbar-active'); 
          $(".div2").removeClass('back2'); 
      },
      
      hardwarethon: function(that) {
          HomeView.setPosition(1);
          $(window).unbind('scroll');
          $("html, body").animate({ scrollTop: $("#hardwarethonDiv").offset().top-50 }, 'slow');
          setTimeout(that.bindScroll, 1000);
          $(".navbar-nav li").removeClass('navbar-active');
          $(".hardwarethonMenu").addClass('navbar-active'); 
          $(".div2").removeClass('back2'); 
      },

      culture: function(that) {
          HomeView.setPosition(1);
          $(window).unbind('scroll');
          $("html, body").animate({ scrollTop: $("#cultureDiv").offset().top-100 }, 'slow');
          setTimeout(that.bindScroll, 1000);
          $(".navbar-nav li").removeClass('navbar-active');
          $(".cultureMenu").addClass('navbar-active'); 
          $(".div2").addClass('back2'); 
      },

      team: function(that) {
          HomeView.setPosition(1);
          $(window).unbind('scroll');
          $("html, body").animate({ scrollTop: $("#teamDiv").offset().top-100 }, 'slow');
          setTimeout(that.bindScroll, 1000);
          $(".navbar-nav li").removeClass('navbar-active');
          $(".teamMenu").addClass('navbar-active'); 
          $(".div2").addClass('back2'); 
      },
      
      contact: function(that) {
          HomeView.setPosition(1);
          $(window).unbind('scroll');
          $("html, body").animate({ scrollTop: $("#contactDiv").offset().top-100 }, 'slow');
          setTimeout(that.bindScroll, 1000);
          $(".navbar-nav li").removeClass('navbar-active');
          $(".contactMenu").addClass('navbar-active'); 
          $(".div2").addClass('back2'); 
      },

      bindScroll: function(){
        $(window).scroll(HomeView.windowScroll);
      }
  });
  return Router;
});


