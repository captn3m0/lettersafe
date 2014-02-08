define ['marionette', 'collections/emails', 'controllers/emails'], (Marionette, Collection, Controller)->


	EmailsView = Marionette.CollectionView.extend
		template: jade.templates['inbox']
		collection: new Collection []
		collectionEvents:
			'add': 'renderEmailItem'
		renderEmailItem: (model)->
			console.log model
		onRender: ->
			console.log 'Rendering UL'
			window.aa = @.collection
			@.collection.fetch
				success: (collection)->
					console.log 'Collection Ready... '



	View = new EmailsView()
	
	return View