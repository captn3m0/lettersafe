// Generated by CoffeeScript 1.7.0
define(['regions/header', 'regions/content', 'regions/menu', 'routers/approuter'], function(HeaderRegion, ContentRegion, MenuRegion, AppRouter) {
  var App;
  App = new Marionette.Application();
  App.addInitializer(function() {
    return AppRouter.doubleCheck();
  });
  App.on('start', function() {
    if (!Backbone.History.started) {
      Backbone.history.start({
        pushState: false,
        hashChange: true
      });
    }
    return console.log('History :: Started');
  });
  return App;
});
