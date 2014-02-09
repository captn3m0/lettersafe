// Generated by CoffeeScript 1.7.0
define(['models/menu', 'collections/menu', 'vent', 'controllers/menu'], function(Model, Collection, vent, Controller) {
  var MenuItemView, View, menuView;
  MenuItemView = Marionette.ItemView.extend({
    template: jade.templates['menu-item'],
    tagName: 'li',
    events: {
      'click .menu-item': 'handleMenuClick'
    },
    modelEvents: {
      'change:isActive': 'toggleActive'
    },
    toggleActive: function() {
      var isActive;
      isActive = this.model.get('isActive');
      if (isActive) {
        this.$el.find('.menu-item').addClass('active');
        this.renderMenu();
      }
      if (!isActive) {
        return this.$el.find('.menu-item').removeClass('active');
      }
    },
    handleMenuClick: function() {
      var action;
      action = '';
      if (this.model.get('subMenuList')) {
        action = 'menu:togglesubmenu';
      } else {
        action = 'menu:toggleactive';
      }
      return vent.trigger('menu:toggleactive', this.model.cid);
    },
    renderMenu: function() {
      var model;
      model = this.model;
      return Controller.renderMenu(model);
    }
  });
  menuView = Marionette.CompositeView.extend({
    template: jade.templates.menu,
    itemView: MenuItemView,
    itemViewContainer: '.menu-items-list',
    itemViewOptions: function() {
      return {
        parentEl: this.el
      };
    },
    model: Model,
    collection: Collection,
    events: {
      'click .do-hideMenu': 'hideMenu',
      'blur': 'loseFocus'
    },
    loseFocus: function() {
      return console.log('Unfocused window');
    },
    hideMenu: function() {
      console.log('Clicked Trigger');
      return vent.trigger('menu:hide');
    },
    setMenuActive: function(_modelcid) {
      var activeView, results, targetView;
      results = this.children.filter(function(k) {
        return k.model.get('isActive');
      });
      if (results.length) {
        activeView = results[0];
        activeView.model.set('isActive', false);
      }
      targetView = this.children.findByModelCid(_modelcid);
      return targetView.model.set('isActive', true);
    }
  });
  View = new menuView();
  vent.on('menu:toggleactive', function(modelCid) {
    return View.setMenuActive(modelCid);
  });
  vent.on('menu:defaultactive', function(fragment) {
    var regex, results;
    regex = new RegExp(' ', 'g');
    results = View.children.find(function(k) {
      return k.model.get('name').toLowerCase().replace(regex, '') === fragment;
    });
    return View.setMenuActive(results.model.cid);
  });
  return View;
});
