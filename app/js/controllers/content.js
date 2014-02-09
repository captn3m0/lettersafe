// Generated by CoffeeScript 1.7.0
define(['marionette', 'vent', 'regions/content'], function(Marionette, vent, contentRegion) {
  var Controller;
  Controller = Marionette.Controller.extend({
    renderView: function(viewURL, guid) {
      return requirejs([viewURL], function(view) {
        if (viewURL === !'views/compose') {
          $(".do-sendmail").addClass('hidden');
        }
        if (guid != null) {
          return vent.trigger('content:showBigEmail', guid);
        } else {
          return vent.trigger('content:showview', view);
        }
      });
    }
  });
  return new Controller();
});
