
define ['marionette', 'vent'], (Marionette, vent)->

	ContentRegion = Marionette.Region.extend
		open: (view)->
			view.$el.hide()
			view.$el.addClass 'container-fluid'
			@.$el.html view.el
			view.$el.show 'drop', {direction: 'up'}, 300		

	Region = new ContentRegion 
		el: 'section.app-content'
	
	vent.on 'content:showview', (view)->
		Region.show view

	return Region