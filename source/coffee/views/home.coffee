define ['marionette'], (Marionette)->

	HomeView = Marionette.ItemView.extend
		template: jade.templates['home']
		
		onRender: ->
			# Full width on container
			@.$el.attr 'data-fullwidth', 'true'

	View = new HomeView()
	
	return View