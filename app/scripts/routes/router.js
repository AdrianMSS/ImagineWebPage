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
          '': 'home',
          'home': 'home',
          'metodology': 'metodology',
          'proyects': 'proyects',
          'hardwarethon': 'hardwarethon',
          'team': 'team',
          'contact': 'contact',
          '*path':  'home'
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

      home: function() {
          HomeView.movePage(0);
      },
      
      metodology: function() {
          HomeView.movePage(1);
      },
      
      proyects: function() {
          HomeView.movePage(5);
      },
      
      hardwarethon: function() {
          HomeView.movePage(6);
      },

      team: function() {
          HomeView.movePage(7);
      },
      
      contact: function() {
          HomeView.movePage(8);
      }
  });
  return Router;
});


