define ['marionette', 'vent', 'regions/content'], (Marionette, vent, contentRegion)->

	Controller = Marionette.Controller.extend

		renderView: (viewURL)-> 
			requirejs [viewURL], (view)->
				vent.trigger 'content:showview', view
				
		renderEmail: (viewURL, id)->
			@.renderView viewURL
	
	return new Controller()