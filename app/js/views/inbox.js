// Generated by CoffeeScript 1.7.0
define(['marionette', 'collections/emails', 'vent'], function(Marionette, Collection, vent) {
  var EmailItem, EmailsView, View;
  EmailItem = Marionette.ItemView.extend({
    template: jade.templates['email-item'],
    tagName: 'li',
    className: 'email-item',
    events: {
      'click .sender': 'handleClick',
      'click .user-picture': 'toggleSelected',
      'click .short-message': 'handleClick'
    },
    handleClick: function() {
      console.log(this.model);
      vent.trigger('header:update:name', this.model.get('user'));
      return vent.trigger('showfullmail', this.$el);
    },
    toggleSelected: function() {
      var val;
      val = this.model.get('isSelected');
      if (val === true) {
        this.model.set('isSelected', false);
      }
      if (val === false) {
        this.model.set('isSelected', true);
      }
      return this.$el.toggleClass('active');
    }
  });
  EmailsView = Marionette.CollectionView.extend({
    tagName: 'ul',
    className: 'list-unstyled emails-list',
    itemView: EmailItem,
    itemViewContainer: '.emails-list',
    collection: new Collection([])
  });
  View = new EmailsView();
  View.on('render', function() {
    return View.collection.fetch({
      success: function(collection) {
        return console.log('Collection Ready... ');
      }
    });
  });
  vent.on('showfullmail', function(element) {
    $(element).find('.user-info .short-message').toggle();
    return $(element).find('.user-info .message').removeClass('hidden').show().addClass('fullmode');
  });
  return View;
});
