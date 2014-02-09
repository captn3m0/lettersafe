define ['marionette', 'controllers/content', 'vent'], (Marionette, ContentController, vent)->

	AppController = Marionette.Controller.extend

		renderHome: ->
			ContentController.renderView 'views/home'
			vent.trigger 'header:update:name', 'Home'
		renderInbox: ->
			ContentController.renderView 'views/inbox'
			vent.trigger 'header:update:name', 'Inbox'
		renderEmail: ->
			ContentController.renderView 'views/inbox'
			vent.trigger 'header:update:name', 'Inbox'
		renderRegister: ->
			ContentController.renderView 'views/register'
			vent.trigger 'header:update:name', 'Register'
		renderCompose: ->
			ContentController.renderView 'views/compose'
			vent.trigger 'header:update:name', 'Compose Mail'


	Controller = new AppController()
	return Controller