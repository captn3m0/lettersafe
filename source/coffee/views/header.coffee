define ['marionette', 'vent'], (Marionette, vent)->

	HeaderView = Marionette.ItemView.extend
		
		template: jade.templates['header']
		tagName: 'header'
		className: 'header-inner'
		events:
			'click .do-showMenu': 'showMenu'
		showMenu: -> vent.trigger 'menu:show'
		updateName: (_name)->
			@.$el.find('.panel-name').text _name

	
	View = new HeaderView()


	# Update the menu breadcrumb when user clicks email
	vent.on 'header:info:update', (model)->
		#View.setPicture model.get('picture')
		View.updateName model.get('name')
	return View