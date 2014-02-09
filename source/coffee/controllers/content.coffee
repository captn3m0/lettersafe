define ['marionette', 'vent', 'regions/content'], (Marionette, vent, contentRegion)->

	Controller = Marionette.Controller.extend

		renderView: (viewURL, guid)-> 
			requirejs [viewURL], (view)->
				if guid?
					vent.trigger 'content:showBigEmail', guid
				else vent.trigger 'content:showview', view
				
	
	return new Controller()