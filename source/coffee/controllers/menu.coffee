define ['marionette', 'vent'], (Marionette, vent)->

	MenuController = Marionette.Controller.extend
		
		getRouteName: (path)->
			all_spaces = new RegExp(' ', 'g')
			return path.toLowerCase().replace all_spaces, ''
		
		renderMenu: (model)->
			
			name = @.getRouteName model.get('name')
			Backbone.history.navigate name, {trigger: true}
			
			vent.trigger 'update:breadcrumbs', name


			
	Controller = new MenuController()
	
	return Controller