define ['marionette', 'controllers/appcontroller'], (Marionette, AppController)->

	AppRouter = Marionette.AppRouter.extend
		
		controller: AppController
		
		appRoutes:
			'': 'renderHome'
			'home': 'renderHome'
			'inbox': 'renderInbox'
			'inbox/:id': 'renderEmail'

		doubleCheck: ->
			console.log 'Still Ready'


	Router = new AppRouter()
	return Router
