define ['marionette', 'vent'], (Marionette, vent)->

	HeaderView = Marionette.ItemView.extend
		
		template: jade.templates['header']
		tagName: 'header'
		className: 'header-inner'
		events:
			'click .do-showMenu': 'showMenu'
			'click .do-renderInbox': 'goInbox'
		goInbox: ->
			console.log 'YoYo'
			element = $(".user-info .message.fullmode")
			console.log element
			$(element).parent()
				.parent()
				.find('.user-info .short-message')
				.toggle()
			

			$(element).hide()
				.addClass('hidden')
				.removeClass('fullmode')

			vent.trigger 'header:update:name', 'Inbox'

		showMenu: -> vent.trigger 'menu:show'
		updateName: (_name)->
			@.$el.find('.panel-name').text _name

	
	View = new HeaderView()


	# Update the menu breadcrumb when user clicks email
	vent.on 'header:update:name', (name)->
		#View.setPicture model.get('picture')
		View.updateName name
	return View