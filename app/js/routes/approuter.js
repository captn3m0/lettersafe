// Generated by CoffeeScript 1.7.0
define(['marionette', 'controllers/appcontroller'], function(Marionette, AppController) {
  var AppRouter, Router;
  AppRouter = Marionette.AppRouter.extend({
    controller: AppController,
    appRoutes: {
      '': 'renderHome'
    }
  });
  Router = new AppRouter();
  return Router;
});