// Generated by CoffeeScript 1.7.0
define(['marionette'], function(Marionette) {
  var EmailsController;
  EmailsController = Marionette.Controller.extend({
    fetchRecent: function(callback) {
      var mongoURL, templateURL;
      console.log('Fetching Recent Emails...');
      if (typeof callback === 'function') {
        templateURL = './data/recentEmails.json';
        mongoURL = '/emails.json';
        return $.getJSON(mongoURL, function(response) {
          if (!response) {
            return console.error('No data available');
          } else {
            return callback(response);
          }
        });
      }
    }
  });
  return new EmailsController();
});
