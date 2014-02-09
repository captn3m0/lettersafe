// Generated by CoffeeScript 1.7.0
define(['backbone'], function(Backbone) {
  var Model;
  Model = Backbone.Model.extend({
    idAttribute: '_id',
    defaults: {
      iconClass: 'fa fa-fw fa-envelope-o',
      subject: 'No Subject',
      picture: 'http://placehold.it/48x48',
      msg: 'Lorem ipsum solor di amet',
      isSelected: false
    },
    initialize: function() {
      this.set('id', this.get('_id'));
      this.set('name', this.get('user'));
      return this.set('message', this.get('msg'));
    }
  });
  return Model;
});
