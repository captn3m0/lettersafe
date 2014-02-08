define ['marionette', 'vent', 'views/menu'], (Marionette, vent, menuView)->

	MenuRegion = Marionette.Region.extend

		open: (view)->
			view.$el.hide()
			@.$el.html view.el
			view.$el.show 'drop', {direction: 'down'}
			return @

		showMenu: ->
			@.$el.attr 'data-visibility', 'visible'
			return @
		hideMenu: ->
			@.$el.attr 'data-visibility', 'hidden'
			return @
	
	Region = new MenuRegion
		el: 'section.app-menu'


	Region.show menuView
	
	vent.on 'menu:hide', ()-> 
		console.log 'Hiding Menu'
		Region.hideMenu()
	vent.on 'menu:show', ()-> 
		Region.showMenu()

	return Region