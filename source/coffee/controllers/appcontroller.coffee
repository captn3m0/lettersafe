define ['marionette', 'controllers/content'], (Marionette, ContentController)->

	AppController = Marionette.Controller.extend

		renderHome: ->
			ContentController.renderView 'views/home'
		renderInbox: ->
			ContentController.renderView 'views/inbox'
		renderEmail: (id)->
			ContentController.renderEmail 'views/inbox', id

	Controller = new AppController()
	return Controller