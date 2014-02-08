define ['marionette', 'views/header'], (Marionette, headerView)->

	HeaderRegion = Marionette.Region.extend
			
		open: (view)->
			view.$el.hide()
			this.$el.html view.el
			view.$el.show 'drop', {direction: 'up'}, 200
	
	Region = new HeaderRegion
		el: 'section.app-header'

	Region.show headerView

	return Region