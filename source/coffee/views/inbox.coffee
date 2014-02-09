define ['marionette', 'collections/emails', 'vent'], (Marionette, Collection, vent)->


	EmailItem = Marionette.ItemView.extend
		template: jade.templates['email-item']
		tagName: 'li'
		className: 'email-item'
		events:
			'click .sender': 'handleClick'
			'click .user-picture': 'toggleSelected'
			'click .short-message': 'handleClick'
		handleClick: ->
			# url = Backbone.history.getHash().split('/')[0] + '/' + @.model.get('id')
			# console.log url 
			# Backbone.history.navigate url, {trigger:true}
			console.log @.model
			vent.trigger 'header:update:name', @.model.get('user')
			vent.trigger 'showfullmail', @.$el
		
		toggleSelected: ->
			val = @.model.get('isSelected')
			if val is true then @.model.set 'isSelected', false
			if val is false then @.model.set 'isSelected', true
			@.$el.toggleClass 'active'
			

	EmailsView = Marionette.CollectionView.extend
		tagName: 'ul'
		className: 'list-unstyled emails-list'
		itemView: EmailItem
		itemViewContainer: '.emails-list'
		collection: new Collection []
			
	
	View = new EmailsView()

	View.on 'render', ()->
		View.collection.fetch
			success: (collection)->
				console.log 'Collection Ready... '

	vent.on 'showfullmail', (element)->
		$(element).find('.user-info .short-message').toggle()
		$(element)
			.find('.user-info .message')
			.removeClass('hidden')
			.show()
			.addClass('fullmode')

	
	return View