define ['marionette', 'controllers/appcontroller'], (Marionette, AppController)->

	AppRouter = Marionette.AppRouter.extend
		
		controller: AppController
		
		appRoutes:
			'': 'renderHome'
			'home': 'renderHome'
			'inbox': 'renderInbox'
			'inbox/:guid': 'renderEmail'
			'register': 'renderRegister'
			'compose': 'renderCompose'

		doubleCheck: ->
			console.log 'Still Ready'


	Router = new AppRouter()
	return Router
