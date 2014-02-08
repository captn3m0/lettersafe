define ['marionette', 'vent'], (Marionette, vent)->

	HeaderView = Marionette.ItemView.extend
		
		template: jade.templates['header']
		tagName: 'header'
		className: 'header-inner'
		events:
			'click .do-showMenu': 'showMenu'
		showMenu: -> vent.trigger 'menu:show'
	
	View = new HeaderView()
	
	return View