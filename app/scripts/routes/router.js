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
          '':     'home',
          'home': 'home',
          'collection': 'collection',
          'contact': 'contact',
          'about': 'about',
          'designer': 'designer',
          'en': 'en',
          'es': 'es'
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
        this.menuRender = false;
        window.history.back();
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
        this.menuRender = false;
        window.history.back();
      },

      home: function() {
          if(!this.menuRender){
            MenuView.render();
            this.menuRender = true;
          }
          HomeView.render();
      },

      collection: function() {
          /*if(!this.menuRender){
            MenuView.render();
            this.menuRender = true;
          }
          CollectionsView.render();*/
      },

      contact: function() {
          $("html, body").animate({ scrollTop: $("#contactDiv").offset().top }, 'slow', 'swing');
      },

      about: function() {
          if(!this.menuRender){
            MenuView.render();
            this.menuRender = true;
          }
          AboutUsView.render();
      },

      designer: function() {
          if(!this.menuRender){
            MenuView.render();
            this.menuRender = true;
          }
          DesignerView.render();
      }
  });
  return Router;
});


