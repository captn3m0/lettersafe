define ['marionette', 'vent', 'regions/content'], (Marionette, vent, contentRegion)->

	Controller = Marionette.Controller.extend

		renderView: (viewURL, guid)-> 
			requirejs [viewURL], (view)->
				if viewURL is not 'views/compose' then $(".do-sendmail").addClass('hidden')
				if guid?
					vent.trigger 'content:showBigEmail', guid
				else vent.trigger 'content:showview', view
				
	
	return new Controller()