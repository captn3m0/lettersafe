define ['marionette', 'controllers/content'], (Marionette, ContentController)->

	AppController = Marionette.Controller.extend

		renderHome: ->
			ContentController.renderView 'views/home'

	Controller = new AppController()
	return Controller