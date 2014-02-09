define ['marionette', 'collections/emails', 'controllers/emails', 'vent'], (Marionette, Collection, Controller, vent)->


	EmailItem = Marionette.ItemView.extend
		template: jade.templates['email-item']
		tagName: 'li'
		className: 'email-item'
		events:
			'click .sender': 'handleClick'
			'click .user-picture': 'handleClick'
			'click .short-message': 'handleClick'
		handleClick: ->
			url = Backbone.history.getHash().split('/')[0] + '/' + @.model.get('guid')
			console.log url 
			Backbone.history.navigate url, {trigger:true}
			# vent.trigger 'header:info:update', @.model
		
			

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
	
	return View