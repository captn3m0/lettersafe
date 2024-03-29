// Generated by CoffeeScript 1.7.0
define(['marionette'], function(Marionette) {
  var HomeView, View;
  HomeView = Marionette.ItemView.extend({
    template: jade.templates['home'],
    events: {
      'click .login-button': 'doRegister'
    },
    doRegister: function() {
      var ppass, uname;
      uname = this.$el.find('#username').val();
      ppass = this.$el.find('#password').val();
      return $.post('/register', {
        username: uname,
        password: ppass
      }, function(response) {
        if (response === 'Fail') {
          return Backbone.history.navigate('register', {
            trigger: true
          });
        } else {
          return Backbone.history.navigate('inbox', {
            trigger: true
          });
        }
      });
    },
    onRender: function() {
      this.$el.attr('data-fullwidth', 'true');
      return this.$el.find('.login-button').text('Register');
    }
  });
  View = new HomeView();
  return View;
});
