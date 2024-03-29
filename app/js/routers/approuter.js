// Generated by CoffeeScript 1.7.0
define(['marionette', 'controllers/appcontroller'], function(Marionette, AppController) {
  var AppRouter, Router;
  AppRouter = Marionette.AppRouter.extend({
    controller: AppController,
    appRoutes: {
      '': 'renderHome',
      'home': 'renderHome',
      'inbox': 'renderInbox',
      'inbox/:guid': 'renderEmail',
      'register': 'renderRegister',
      'compose': 'renderCompose'
    },
    doubleCheck: function() {
      return console.log('Still Ready');
    }
  });
  Router = new AppRouter();
  return Router;
});
